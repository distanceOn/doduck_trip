import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./url";

const routesApi = createApi({
  reducerPath: "routesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (build) => ({
    getRoutes: build.query({
      query: () => "routes/all",
    }),
  }),
});

export const { useGetRoutesQuery } = routesApi;
export default routesApi;
