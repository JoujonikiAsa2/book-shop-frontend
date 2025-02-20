import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialProducts = {
  totalProducts: 0;
  user: string | null;
  products: {
    product: string;
    quantity: number;
  }[];
};
const initialProducts: initialProducts = {
  totalProducts: 0,
  user: null,
  products: [],
};

const cartSlice = createSlice({
  initialState: initialProducts,
  name: "cart",
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.user = action.payload; 
    },
    add: (
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) => {
      const { userId, productId } = action.payload;
      if (state.user !== userId) return;
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
    remove: (
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) => {
      const { userId, productId } = action.payload;
      if (state.user !== userId) return;
      const existingProductIndex = state.products.findIndex(
        (product) => product.product === productId
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          state.totalProducts -= 1;
        } else {
          state.products.splice(existingProductIndex, 1);
          state.totalProducts -= 1;
        }
      }
    },
    reset: (state) => {
      state.totalProducts = 0;
      state.products = [];
    },
  },
});

export const { setUserId, add, remove, reset } = cartSlice.actions;
export default cartSlice.reducer;
