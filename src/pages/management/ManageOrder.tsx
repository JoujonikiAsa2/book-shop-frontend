import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteAnOrderMutation,
  useGetAllOrdersQuery,
  useUpdateAnOrderMutation,
} from "@/redux/features/orders/orderApi";
import { TQueryParam } from "@/types/global";
import { TOrder } from "@/types/order";
import { ArrowLeft, ArrowRight, Delete, Edit, Loader } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ManageOrder = () => {
  const form = useForm();
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [orderInfo, setOrderInfo] = useState<TOrder | undefined>(undefined);
  const queryParam: TQueryParam[] = [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: orderData,
    isFetching,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery(params);
  const [deleteOrder] = useDeleteAnOrderMutation();
  const [updateOrder] = useUpdateAnOrderMutation();

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

  const handleUpdateOrder = async (data: FieldValues) => {
    const orderDataInfo = {
      _id: orderInfo?._id as string,
      address: data?.address !== undefined ? data?.address : orderInfo?.address,
      city: data?.city !== undefined ? data?.city : orderInfo?.city,
      phone: data?.phone !== undefined ? data?.phone : orderInfo?.phone,
      status: data?.status !== undefined ? data?.address : orderInfo?.status,
      transaction: {
        method:
          data?.transactionMethod !== undefined
            ? data?.transactionMethod
            : orderInfo?.transaction?.method,
      },
    };
    const result = await updateOrder(orderDataInfo);
    console.log(result);
    toast.success("Updated");
    refetch();
  };

  const handleDeleteOrder = async (orderId: string) => {
    const result = await deleteOrder(orderId);
    console.log(result);
    toast.success("Deleted");
    refetch();
  };
  return (
    <>
      {totalPages >= 1 ? (
        <div className="w-fit lg:w-[40rem] m-10 poppins-regular">
          <div className="w-[300px] lg:w-[1000px] h-[65vh] overflow-x-scroll">
          <Table className="border rounded-lg bg-[#F3F3F3]">
            <TableHeader className="bg-[#1B4D3E]">
              <TableRow>
                <TableHead className="w-[100px] text-white">Order ID</TableHead>
                <TableHead className="text-white">Transaction ID</TableHead>
                <TableHead className="text-white">Full Address</TableHead>
                <TableHead className="text-white">Phone</TableHead>
                <TableHead className="text-white">Payment Status</TableHead>
                <TableHead className="text-white">Payment Method</TableHead>
                <TableHead className="text-right text-white">Product Quantity</TableHead>
                <TableHead className="text-right text-white">Total Price</TableHead>
                <TableHead className="text-right text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData?.data?.map((order: TOrder) => {
                const totalQuantity =
                  order?.products?.reduce(
                    (total, product) => total + product.quantity,
                    0
                  ) || 0;

                return (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.transaction?.id}</TableCell>
                    <TableCell>{order?.address + " " + order?.city}</TableCell>
                    <TableCell>{order?.phone}</TableCell>
                    <TableCell>
                      <div
                        className={`p-1 rounded ${
                          (order?.status === "Pending" &&
                            `bg-yellow-300 w-fit`) ||
                          (order?.status === "Paid" && `bg-blue-300 w-fit`) ||
                          (order?.status === "Cancelled" && `bg-red-300 w-fit`)
                        }`}
                      >
                        {order?.status}
                      </div>
                    </TableCell>
                    <TableCell>{order?.transaction?.method}</TableCell>
                    <TableCell>{totalQuantity}</TableCell>
                    <TableCell className="text-right">
                      {order?.totalPrice && order?.totalPrice + " Taka"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <div>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                              className="bg-[#426CBE] text-white  hover:bg-[#b2c2e2] "
                                variant="outline"
                                onClick={() => setOrderInfo(order)}
                              >
                                <Edit size="18" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>
                                  Update Order Information
                                </SheetTitle>
                                <SheetDescription>
                                  Make changes to order here. Click save when
                                  you're done.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="">
                                  <BSForm
                                    form={form}
                                    onSubmit={handleUpdateOrder}
                                  >
                                    <BSInput
                                      form={form}
                                      type="text"
                                      name="address"
                                      label="Address"
                                      required={false}
                                      placeholder={order?.address}
                                      className="border-gray-400 "
                                    />
                                    <BSInput
                                      form={form}
                                      type="text"
                                      name="city"
                                      label="City"
                                      required={false}
                                      placeholder={order?.city}
                                      className="border-gray-400 "
                                    />
                                    <BSInput
                                      form={form}
                                      type="text"
                                      name="phone"
                                      label="Phone"
                                      required={false}
                                      placeholder={order?.phone}
                                      className="border-gray-400 "
                                    />
                                    <Select
                                      onValueChange={(value) =>
                                        form.setValue(
                                          "transactionMethod",
                                          value
                                        )
                                      }
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue
                                          placeholder={
                                            order?.transaction?.method
                                          }
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value={"iBanking"}>
                                            iBanking
                                          </SelectItem>
                                          <SelectItem value={"Nagad"}>
                                            Nagad
                                          </SelectItem>
                                          <SelectItem value={"Cards"}>
                                            Cards
                                          </SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <Select
                                      onValueChange={(value) =>
                                        form.setValue(
                                          "transactionStatus",
                                          value
                                        )
                                      }
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue
                                          placeholder={order?.status}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value={"Paid"}>
                                            Paid
                                          </SelectItem>
                                          <SelectItem value={"Pending"}>
                                            Pending
                                          </SelectItem>
                                          <SelectItem value={"Cancelled"}>
                                            Cancelled
                                          </SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    <BSInput
                                      form={form}
                                      type="number"
                                      name="totalPrice"
                                      label="Total Price"
                                      required={false}
                                      placeholder={order?.totalPrice.toString()}
                                      className="border-gray-400 "
                                    />
                                    <Button type="submit" className="w-full">
                                      Update Order
                                    </Button>
                                  </BSForm>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                        <div>
                          <Button
                          className="bg-red-400 text-white hover:bg-red-200"
                            variant="outline"
                            onClick={() => handleDeleteOrder(order?._id)}
                          >
                            <Delete size="18" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow></TableRow>
            </TableBody>
          </Table>
          </div>
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
                    className={`${
                      currentPage === item
                        ? "bg-[#1B4D3E] text-white"
                        : "text-primary"
                    }`}
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
      ) : (
        <div className="text-center p-10">
          <h2>No order available</h2>
        </div>
      )}
    </>
  );
};

export default ManageOrder;
