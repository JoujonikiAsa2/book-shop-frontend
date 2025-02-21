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

const Orders = () => {
  const user = useAppSelector(selectCurrentUser);
  const {
    data: orderData,
    isFetching,
    isLoading,
  } = useGetUserOrderQuery(user?.user as string);
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (orderData?.data?.success === false) {
    <div className="h-[80vh] w-[70vw] flex items-center justify-center">
      <p>You are not authorized</p>
    </div>;
  }
  return (
    <div className="w-fit lg:w-[40rem] m-10 poppins-regular">
      <div className="w-[300px] lg:w-[1000px] h-[65vh] overflow-x-scroll">
        <Table className="border rounded-lg bg-[#F3F3F3]">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-[#1B4D3E]">
            <TableRow>
              <TableHead className="w-[100px] text-white">Phone</TableHead>
              <TableHead className="w-[100px] text-white">Order ID</TableHead>
              <TableHead className="text-white">Transaction ID</TableHead>
              <TableHead className="text-white">Payment Status</TableHead>
              <TableHead className="text-right text-white">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.data?.map((order: TOrder) => (
              <TableRow key={order?._id}>
                <TableCell className="text-wrap">{order?.phone}</TableCell>
                <TableCell className="text-wrap">{order?._id}</TableCell>
                <TableCell>{order?.transaction?.id}</TableCell>
                <TableCell>
                  <div
                    className={`p-1 rounded ${
                      (order?.status === "Pending" && `bg-yellow-300 w-fit`) ||
                      (order?.status === "Paid" && `bg-blue-300 w-fit`) ||
                      (order?.status === "Cancelled" && `bg-red-300 w-fit`)
                    }`}
                  >
                    {order?.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {order?.totalPrice && "৳" + order?.totalPrice }
                </TableCell>
              </TableRow>
            ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Orders;
