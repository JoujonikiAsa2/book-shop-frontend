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
      providesTags: ["products"],
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
      providesTags: ["products"],
    }),
    createAnProduct: builder.mutation({
      query: (productInfo: Partial<TProduct>) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
    }),
  }),
  
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateAnProductMutation
} = productApi;
