/* eslint-disable @typescript-eslint/no-explicit-any */
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateAnOrderMutation } from "@/redux/features/orders/orderApi";
import { useAppSelector } from "@/redux/hooks";
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

const CheckOut = () => {
  const form = useForm();
  const { productId } = useParams();
  const user = useAppSelector(selectCurrentUser);
  const [createOrder] = useCreateAnOrderMutation();

  const handleOrder = async(data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const orderInfo: orderInfo = {
      user: user?._id as string,
      products: [{
        product: productId,
        quantity: 1,
      }],
      phone: data.phone,
      address: data.address,
      city: data.city,
    };
    try {
      const res = await createOrder(orderInfo);
      console.log(res)
      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        console.log(res.data.data)
        window.location.replace(res.data.data);
      }
    } catch (error:any){
        console.log(error);
        toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="w-full min- min-h-[80vh] flex justify-center items-center p-16">
      <div className="">
        <div className="pt-2.5 w-[300px] max-w-[500px] mx-auto h-[450px] bg-purple-300 border p-6">
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
            <Button type="submit">Confirm Order</Button>
          </BSForm>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
