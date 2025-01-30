import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => (
{        getMe: builder.query({
            query: ()=>({
                url:'/users/me',
                method: "GET",
            })
        })}
    )
})

export const {useGetMeQuery} = userApi