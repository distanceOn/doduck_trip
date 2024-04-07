import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./url";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (build) => ({
    signup: build.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;

export default authApi;
