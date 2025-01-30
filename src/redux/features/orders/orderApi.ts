import { orderInfo } from "@/pages/orders/CheckOut";
import { baseApi } from "@/redux/api/baseApi";
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrder: builder.query({
      query: (id:string) => ({
        url: `/orders/user-order/${id}`,
        method: "GET",
      }),
    }),
    createAnOrder: builder.mutation({
      query: (orderInfo: orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
    }),
    verifyPayment: builder.query({
      query: (orderId: string) => ({
        url: "/orders/user/payment/verify",
        method: "GET",
        params: { order_id: orderId },
      }),
    }),
  }),
});

export const { useGetUserOrderQuery, useCreateAnOrderMutation, useVerifyPaymentQuery } = orderApi;
