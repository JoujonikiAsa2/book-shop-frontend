import { reset } from "@/redux/features/orders/cartSlice";
import { useVerifyPaymentQuery } from "@/redux/features/orders/orderApi";
import { useAppDispatch } from "@/redux/hooks";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

const PaymentProcessing = () => {
  const location = useLocation();
  const dispatch = useAppDispatch()
  const orderId = location.search
    .slice(1, location.search.length)
    .split("=")[1];
  const {
    data: paymentData,
    isFetching,
    isLoading,
  } = useVerifyPaymentQuery(orderId);
  console.log(paymentData, orderId);
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (
    ["Success", "Failed", "Canceled"].includes(paymentData?.data[0].bank_status)
  ) {
    if(paymentData?.data[0].bank_status === "Success"){
      dispatch(reset())
    }
    window.location.replace(
      "http://localhost:5173/dashboard/user/payment-details"
    );
  } else {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="bg-[#E07A5F] w-72 h-32 text-xl font-bold uppercase text-white flex items-center justify-center">
          Failed to payment
        </div>
      </div>
    );
  }
};

export default PaymentProcessing;
