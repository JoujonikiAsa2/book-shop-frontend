import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo
            })
        }),
        changePassword: builder.mutation({
            query: (payload) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useChangePasswordMutation} = authApi