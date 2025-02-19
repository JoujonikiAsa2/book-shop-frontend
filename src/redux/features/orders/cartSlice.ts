import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialProducts = {
  totalProducts: 0;
  products: {
    product: string;
    quantity: number;
  }[];
};
const initialProducts: initialProducts = {
  totalProducts: 0,
  products: [],
};

const cartSlice = createSlice({
  initialState: initialProducts,
  name: "cart",
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (product) => product.product === productId
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product: productId, quantity: 1 });
      }
      state.totalProducts += 1;
    },
    remove: (state, action: PayloadAction<{ productId: string }>) => {
      const productId = action.payload.productId;
      const existingProduct = state.products.find(
        (p) => p.product === productId
      );

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
