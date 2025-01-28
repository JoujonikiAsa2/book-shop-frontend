import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        methods: "GET"
      }),
    })
  }),
});

export const { useGetProductsQuery } = productApi;