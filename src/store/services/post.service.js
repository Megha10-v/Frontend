import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios/baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/post",
  }),
  endpoints: (builder) => ({
    getRentCategoryList: builder.query({
      query: (payload) => ({
        url: "/rent_category_posts",
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["AdCategoryList"],
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/create_post",
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
    }),
    getRecentUnsavedAds: builder.query({
      query: () => ({
        url: "/get_recent_unsaved_ad",
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["UnsavedAds"],
    }),
  }),
});

export const {
  useGetRentCategoryListQuery,
  useCreatePostMutation,
  useGetRecentUnsavedAdsQuery,
} = postApi;
