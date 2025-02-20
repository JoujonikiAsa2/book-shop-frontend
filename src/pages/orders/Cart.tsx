/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { add, remove } from "@/redux/features/orders/cartSlice";
import { useGetProductsQuery } from "@/redux/features/products/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetProductsQuery(undefined);
  const productsCart = useAppSelector((state) => state.cart.products);
  const totalProducts = useAppSelector((state) => state.cart.totalProducts);
  const productIds = productsCart.map((product) => product.product);
  const products = allProducts?.data?.filter((product) =>
    productIds.includes(product._id)
  );

  const allProductPrice = products?.map(
    (product, index) => product?.price * productsCart[index].quantity
  );
  const totalPrice = allProductPrice?.reduce((acc, curr) => acc + curr, 0);

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-full flex flex-col md:flex-row gap-10 justify-center">
      <div className="w-[350px] md:w-[500px] lg:w-[750px] p-4 flex flex-col gap-4">
        {products?.map((product, index) => (
          <div
            className="w-full border p-6 flex flex-col gap-2 md:flex-row justify-between"
            key={index}
          >
            <div className=" flex gap-6 w-[320px] items-center">
              <img src={product?.imgUrl} className="size-20" />
              <h1>{product?.name}</h1>
            </div>
            <div className=" flex items-center">
              <p>৳ {product?.price * productsCart[index].quantity}</p>
            </div>
            <div className=" flex gap-3 items-center justify-end">
              <Plus
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    add({
                      userId: user?.user as string,
                      productId: product?._id,
                    })
                  )
                }
              />
              {productsCart[index].quantity}
              <Minus
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    remove({
                      userId: user?.user as string,
                      productId: product?._id,
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      {productsCart.length > 0 ? (
        <div className="border w-96 h-fit m-4 p-6 space-y-4">
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="flex justify-between">
            <p>Subtotal ({totalProducts} items)</p>
            <p>৳ {totalPrice}</p>
          </div>
          <Link to="/checkout">
            <Button className="w-full mt-4">Proceed To Checkout</Button>
          </Link>
        </div>
      ) : (
        <div className="border w-72 sm:w-96 h-fit m-4 p-6 space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl uppercase">
          <h3>No products in cart</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
