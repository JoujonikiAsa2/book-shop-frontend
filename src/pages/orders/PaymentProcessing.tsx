import { useVerifyPaymentQuery } from "@/redux/features/orders/orderApi";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

const PaymentProcessing = () => {
  const location = useLocation();
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
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (
    ["Success", "Failed", "Canceled"].includes(paymentData?.data[0].bank_status)
  ) {
    window.location.replace("http://localhost:5173/dashboard/payment-details");
  }
  return <div className="w-[70vw] text center">Failed to payment</div>;
};

export default PaymentProcessing;
