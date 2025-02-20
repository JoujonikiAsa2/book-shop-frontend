import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TProduct } from "@/types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/products`,
          methods: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[] | undefined>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductDetails: builder.query({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          methods: "GET",
        };
      },
    }),
    createAnProduct: builder.mutation({
      query: (productInfo: Partial<TProduct>) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
    }),
    updateAProduct: builder.mutation({
      query: (productInfo: Record<string, unknown>) => ({
        url: `/products/${productInfo?._id}`,
        method: "PUT",
        body: productInfo,
      }),
    }),
    deleteAProduct: builder.mutation({
      query: (productId:string) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
  
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateAnProductMutation,
  useUpdateAProductMutation,
  useDeleteAProductMutation
} = productApi;
