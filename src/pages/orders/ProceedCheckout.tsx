/* eslint-disable @typescript-eslint/no-explicit-any */

import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateAnOrderMutation } from "@/redux/features/orders/orderApi";
import { useGetProductDetailsQuery, useGetProductsQuery } from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export type orderInfo = {
  user: string;
  products: {
    product: string | undefined;
    quantity: number;
  }[];
  phone: string;
  address: string;
  city: string;
};

const ProceedCheckout = () => {
  const form = useForm();
  const { id } = useParams();
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetProductsQuery(undefined);
  const {
    data: productById,
  } = useGetProductDetailsQuery(id as string);

  console.log(productById)
  const productsCart = useAppSelector((state) => state.cart.products);
  const totalProducts = useAppSelector((state) => state.cart.totalProducts);
  const productIds = productsCart.map((product) => product.product);
  const products = allProducts?.data?.filter((product) =>
    productIds.includes(product._id)
  );

  const allProductPrice = products?.map(
    (product, index) => product?.price * productsCart[index].quantity
  );
  const totalPrice = allProductPrice?.reduce((acc, curr) => acc + curr, 0) || 0;
  const user = useAppSelector(selectCurrentUser);
  const [createOrder] = useCreateAnOrderMutation();
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const handleOrder = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const orderInfo: orderInfo = {
      user: user?._id as string,
      products: productsCart,
      phone: data.phone,
      address: data.address,
      city: data.city,
    };
    console.log(orderInfo);
    try {
      const res = await createOrder(orderInfo);
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        console.log(res.data.data);
        window.location.replace(res.data.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-10 justify-center">
      <div className="w-[350px] md:w-[500px] lg:w-[750px] p-4 flex flex-col gap-4">
        {products !== undefined && products?.length > 0 ? products?.map((product, index) => 
          <div
            className="w-full border p-6 flex flex-col gap-2 md:flex-row justify-between"
            key={product?._id}
          >
            <div className=" flex gap-6 w-[320px] items-center">
              <img src={product?.imgUrl} className="size-20" />
              <h1>{product?.name}</h1>
            </div>
            <div className=" flex items-center">
              <p>&#2547; {product?.price * productsCart[index].quantity}</p>
            </div>
            <div className=" flex gap-3 items-center justify-end">
              Qty: {productsCart[index].quantity}
            </div>
          </div>)
          : 
          <div
            className="w-full border p-6 flex flex-col gap-2 md:flex-row justify-between"
          >
            <div className=" flex gap-6 w-[320px] items-center">
              <img src={productById?.data?.imgUrl} className="size-20" />
              <h1>{productById?.data?.name}</h1>
            </div>
            <div className=" flex items-center">
              <p>&#2547; {productById?.data?.price}</p>
            </div>
            <div className=" flex gap-3 items-center justify-end">
              Qty: 1
            </div>
          </div>
        }
      </div>

{
  products !== undefined && products?.length > 0 || productById !== undefined ? <div className="border w-72 sm:w-96 h-fit m-4 p-6 space-y-4">
  <h3 className="text-lg font-bold">Order Summary</h3>
  <div>
    <BSForm form={form} onSubmit={handleOrder}>
      <BSInput
        form={form}
        type="text"
        name="phone"
        label="Phone"
        required={true}
        className="border-gray-400 "
      />
      <BSInput
        form={form}
        type="text"
        name="email"
        label="Email"
        required={true}
        className="border-gray-400 "
      />
      <BSInput
        form={form}
        type="text"
        name="address"
        label="Address"
        required={true}
        className="border-gray-400 "
      />
      <BSInput
        form={form}
        type="text"
        name="city"
        label="City"
        required={true}
        className="border-gray-400 "
      />

      <div className="flex justify-between">
        <p>Subtotal ({totalProducts} items)</p>
        <p>৳ {totalPrice}</p>
      </div>
      <Button type="submit" className="w-full mt-4">
      Order Now
      </Button>
    </BSForm>
  </div>
</div> : 
        <div className="border w-72 sm:w-96 h-fit m-4 p-6 space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl uppercase">
          <h3>No products in cart</h3>
        </div>
}
    </div>
  );
};

export default ProceedCheckout;
