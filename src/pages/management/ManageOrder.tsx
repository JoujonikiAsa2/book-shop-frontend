import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { TQueryParam } from "@/types/global";
import { TOrder } from "@/types/order";
import { ArrowLeft, ArrowRight, Delete, Edit, Loader } from "lucide-react";
import { useState } from "react";

const ManageOrder = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const queryParam: TQueryParam[] = [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: orderData,
    isFetching,
    isLoading,
  } = useGetAllOrdersQuery(params);
  console.log(orderData);

  const totalPages = orderData?.meta?.totalPage || 0;

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (orderData?.data?.length === 0) {
    <div className="h-[80vh] w-[70vw] flex items-center justify-center">
      <p>You are not authorized</p>
    </div>;
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      queryParam.push({ name: "page", value: currentPage - 1 });
      setParams(queryParam);
    } else {
      queryParam.push({ name: "page", value: currentPage });
      setParams(queryParam);
      setCurrentPage(currentPage);
    }
  };
  const handleNext = () => {
    if (currentPage > 0 && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      queryParam.push({ name: "page", value: currentPage + 1 });
      setParams(queryParam);
    } else {
      setCurrentPage(totalPages - 1);
      queryParam.push({ name: "page", value: totalPages - 1 });
      setParams(queryParam);
    }
  };
  return (
    <div className="w-max-7xl  m-10 jost-thin">
      <Table className="lg:w-[1000px] max-w-7xl mx-auto border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderData?.data?.map((order: TOrder) => (
            <TableRow key={order?._id}>
              <TableCell>{order?._id}</TableCell>
              <TableCell>{order?.transaction.id}</TableCell>
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
                {order?.totalPrice && order?.totalPrice + " Taka"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <div>
                    <Edit size="18" />
                  </div>
                  <div>
                    <Delete size="18" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center items-center gap-2 pb-4 py-4">
        <div>
          <Button size={"sm"} variant={"outline"} onClick={handlePrev}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0.3)
            .map((item: number, index: number) => (
              <Button
                key={index}
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  queryParam.push({ name: "page", value: item });
                  setParams(queryParam);
                  setCurrentPage(item);
                }}
              >
                {item}
              </Button>
            ))}
        </div>
        <div>
          <Button size={"sm"} variant={"outline"} onClick={handleNext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
