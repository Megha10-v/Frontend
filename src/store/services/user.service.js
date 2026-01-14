import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/axios/baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/user",
  }),
  endpoints: (builder) => ({
    updateProfilePic: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/update_profile_pic?id=${id}`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/update_profile`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    sendOtp: builder.mutation({
      query: (payload) => ({
        url: `/send_otp`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/create_user`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    verifyUpdateMobile: builder.mutation({
      query: (payload) => ({
        url: `/verify_update_mobile`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    updateMobileEmail: builder.mutation({
      query: (payload) => ({
        url: `/update_email_or_mobile`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: `/verify_otp`,
        method: "POST",
        data: payload,
      }),
      transformResponse: (res) => res?.data,
      // invalidatesTags: [""],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/delete_account?user_id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUpdateProfilePicMutation,
  useUpdateProfileMutation,
  useSendOtpMutation,
  useCreateUserMutation,
  useVerifyUpdateMobileMutation,
  useUpdateMobileEmailMutation,
  useVerifyOtpMutation, 
  useDeleteAccountMutation
} = userApi;
