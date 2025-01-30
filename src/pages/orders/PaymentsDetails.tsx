/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserOrderQuery } from "@/redux/features/orders/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/order";
import { Loader } from "lucide-react";

const PaymentsDetails = () => {
  const user = useAppSelector(selectCurrentUser)
  const { data:paymentData, isFetching, isLoading } = useGetUserOrderQuery(
  user?.user as string);
  console.log(paymentData)
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-max-7xl  m-10 jost-thin">
      <Table className="lg:w-[1000px] max-w-7xl mx-auto border rounded-lg">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentData?.data?.map((order: TOrder) => (
            <TableRow key={order.transaction.id}>
              <TableCell>
                {order.transaction.id}
              </TableCell>
              <TableCell>{order.transaction.bank_status}</TableCell>
              <TableCell>{order.transaction.method}</TableCell>
              <TableCell className="text-right">
                {order.totalPrice} Taka
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size={"sm"}
                  onClick={() =>
                    window.location.replace(
                      `https://sandbox.shurjopayment.com/response?order_id=${order.transaction.id}`
                    )
                  }
                >
                  View Invoice
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default PaymentsDetails;
