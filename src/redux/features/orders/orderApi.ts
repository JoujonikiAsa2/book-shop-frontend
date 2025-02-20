
import { orderInfo } from "@/pages/orders/ProceedCheckout";
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TOrder } from "@/types/order";
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/orders`,
          methods: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[] | undefined>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getUserOrder: builder.query({
      query: (id: string) => ({
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
    deleteAnOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
    }), 
    updateAnOrder: builder.mutation({
      query: (orderInfo: Record<string, unknown>) => ({
        url: `/orders/${orderInfo?._id}`,
        method: "PATCH",
        body: orderInfo,
      }),
    }),
  }),
});

export const {
  useGetUserOrderQuery,
  useCreateAnOrderMutation,
  useVerifyPaymentQuery,
  useGetAllOrdersQuery,
  useDeleteAnOrderMutation,
  useUpdateAnOrderMutation
  
} = orderApi;
