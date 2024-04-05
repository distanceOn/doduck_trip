import type { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from '@reduxjs/toolkit/query'

type ApiArg = any // eslint-disable-line

type ApiResponse = void | any // eslint-disable-line

type ApiError = FetchBaseQueryError

export type UseMutationApi = UseMutation<
  MutationDefinition<
    ApiArg,
    BaseQueryFn<string | FetchArgs, unknown, ApiError, object, object>,
    'User' | 'Projects' | 'CurrentIntegration' | 'Integrations',
    ApiResponse,
    'api'
  >
>

export type AuthTypes = 'entry' | 'register'

export type UserData = {
  id: string
  first_name: string
  last_name: string
  image_url: string
  email: string
  phone_number: string
  notifications_enabled: boolean
  is_partner: boolean
}

export type InputProps = {
  name: string
  type: 'mail' | 'password'
  placeholder: string
  allowClear?: boolean
  showPassword?: boolean
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>
}
