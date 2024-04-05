import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const api = import.meta.env.VITE_BASE_URL || 'api.stage.dotsales.ru'
// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: `https://${api}`,
  credentials: 'include',
  prepareHeaders: headers => headers,
})

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (
    result.error &&
    (result.error.status === 498 || result.error.status === 401)
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/v1/auth/session/refresh',
          api,
          extraOptions,
        )

        if (refreshResult.meta.response.status === 200) {
          localStorage.setItem('isAuth', 'true')

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          localStorage.removeItem('isAuth')
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  tagTypes: [
    'User',
    'Projects',
    'CurrentProject',
    'Integrations',
    'ProjectServices',
    'ProjectConnections',
    'CurrentIntegration',
  ],

  endpoints: () => ({}),
})

export default baseApi
