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
    
  }),
});

export const {
  useGetRentCategoryListQuery
} = postApi;
