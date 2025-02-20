import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TUser } from "@/types/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
     getAllUsers: builder.query({
          query: (args) => {
            console.log(args);
            const params = new URLSearchParams();
            if (args) {
              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
            return {
              url: `/users`,
              methods: "GET",
              params: params,
            };
          },
          transformResponse: (response: TResponseRedux<TUser[] | undefined>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
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
