import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios/baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/admin",
  }),
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => ({
        url: "/get-users",
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["UserList"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: "/block_user",
        method: "PUT",
        params: { id },
      }),
      transformResponse: (res) => res?.data,
      invalidatesTags: ["UserList"],
    }),
    getAdsList: builder.query({
      query: ({ date, location }) => ({
        url: `/get-admin-ads?date=${date}&location=${location}`,
        method: "GET",
      }),
      providesTags: ["AdsList"],
    }),
    getAdsLocationList: builder.query({
      query: () => ({
        url: `/get-ad-locations`,
        method: "GET",
      }),
    }),
    deleteAd: builder.mutation({
      query: (id) => ({
        url: `/delete-ad?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdsList"],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useBlockUserMutation,
  useGetAdsListQuery,
  useGetAdsLocationListQuery,
  useDeleteAdMutation,
} = adminApi;
