import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./url";

const routesApi = createApi({
  reducerPath: "routesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (build) => ({
    getRoutes: build.query({
      query: () => "routes/all",
    }),
    getPlaces: build.query({
      query: () => "spots/all",
    }),
  }),
});

export const { useGetRoutesQuery, useGetPlacesQuery } = routesApi;
export default routesApi;
