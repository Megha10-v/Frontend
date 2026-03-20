import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios/baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/admin",
  }),
  endpoints: (builder) => ({
    createAd: builder.mutation({
      query: (payload) => ({
        url: "/admin-ad-create",
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
    }),
     getSalesUsersList: builder.query({
      query: () => ({
        url: "/get_sales_users",
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["SalesUserList"],
    }),
    getSalesAdsList: builder.query({
      query: () => ({
        url: "/get_sales_ads",
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["SalesAdsList"],
    }),
  }),
});

export const {
 useCreateAdMutation,
 useGetSalesAdsListQuery,
 useGetSalesUsersListQuery
} = adminApi;
