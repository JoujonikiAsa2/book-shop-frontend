import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-profile/${data?.userId}`,
        method: "PATCH",
        body: data
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId:string) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetMeQuery, useGetAllUsersQuery, useUpdateProfileMutation, useDeleteUserMutation } = userApi;
