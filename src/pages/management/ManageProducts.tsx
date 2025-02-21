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
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
  useDeleteAProductMutation,
  useGetProductsQuery,
  useUpdateAProductMutation,
} from "@/redux/features/products/productApi";
import { TQueryParam } from "@/types/global";
import { TProduct } from "@/types/product";
import { ArrowLeft, ArrowRight, Delete, Edit, Loader } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ManageProducts = () => {
  const form = useForm();
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [productInfo, setProductInfo] = useState<TProduct | undefined>(
    undefined
  );
  const queryParam: TQueryParam[] = [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: productData,
    refetch,
    isFetching,
    isLoading,
  } = useGetProductsQuery(params);
  const [updateProduct] = useUpdateAProductMutation();
  const [deleteProduct] = useDeleteAProductMutation();

  const totalPages = productData?.meta?.totalPage || 0;

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (productData?.data?.length === 0) {
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

  console.log(productInfo);
  const handleUpdateProduct = async (data: FieldValues) => {
    console.log(data);
    const productDetails: Partial<TProduct> = {
      _id: productInfo?._id,
      name: data.name !== undefined ? data.name : productInfo?.name,
      author: data.author !== undefined ? data.author : productInfo?.author,
      imgUrl: data.imgUrl !== undefined ? data.imgUrl : productInfo?.imgUrl,
      price: data.price !== undefined ? data.price : productInfo?.price,
      category:
        data.category !== undefined ? data.category : productInfo?.category,
      description:
        data.description !== undefined
          ? data.description
          : productInfo?.description,
      quantity:
        data.quantity !== undefined ? data?.quantity : productInfo?.quantity,
      availability: data.availability === "inStock" ? false : true,
    };
    const result = await updateProduct(productDetails);
    console.log(result);
    toast.success("Updated");
    refetch();
  };

  const handleDeleteProduct = async (orderId: string) => {
    const result = await deleteProduct(orderId);
    console.log(result);
    toast.success("Deleted");
    refetch();
  };

  return (
    <>
    {totalPages>=1 ? <div className="w-fit lg:w-[80rem] m-10 poppins-regular">
      <div className="w-full h-[65vh]">
      <Table className="w-full border rounded-lg overflow-scroll bg-[#F3F3F3]" >
        <TableHeader  className="bg-[#1B4D3E]">
          <TableRow>
            <TableHead className="text-white">Product Name</TableHead>
            <TableHead className="text-white">Author</TableHead>
            <TableHead className="text-white">Price</TableHead>
            <TableHead className="text-white">Avaiability</TableHead>
            <TableHead className="text-white">Quantity</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.data?.map((product: TProduct) => (
            <TableRow key={product?._id}>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.author}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell>
                {product?.availability ? "In Stock" : "Stock Out"}
              </TableCell>
              <TableCell>{product?.quantity}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                        className="bg-[#426CBE] text-white  hover:bg-[#b2c2e2] "
                          variant="outline"
                          onClick={() => setProductInfo(product)}
                        >
                          <Edit size="18" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Update Order Information</SheetTitle>
                          <SheetDescription>
                            Make changes to product here. Click save when you're
                            done.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="">
                            <BSForm form={form} onSubmit={handleUpdateProduct}>
                              <BSInput
                                form={form}
                                type="text"
                                name="name"
                                label="Name"
                                required={false}
                                placeholder={product?.name}
                                className="border-gray-400 "
                              />
                              <BSInput
                                form={form}
                                type="text"
                                name="author"
                                label="Author"
                                required={false}
                                placeholder={product?.author}
                                className="border-gray-400 "
                              />
                              <BSInput
                                form={form}
                                type="number"
                                name="quantity"
                                label="Quantity"
                                required={false}
                                placeholder={product?.quantity?.toString()}
                                className="border-gray-400 "
                              />
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("category", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"Fiction"}>
                                      Fiction
                                    </SelectItem>
                                    <SelectItem value={"Science"}>
                                      Science
                                    </SelectItem>
                                    <SelectItem value={"Poetry"}>
                                      Poetry
                                    </SelectItem>
                                    <SelectItem value={"SelfDevelopment"}>
                                      SelfDevelopment
                                    </SelectItem>
                                    <SelectItem value={"Religious"}>
                                      Religious
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <BSInput
                                form={form}
                                type="number"
                                name="price"
                                label="Price"
                                required={false}
                                placeholder={product?.price?.toString()}
                                className="border-gray-400 "
                              />
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("availibility", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Availability" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"inStock"}>
                                      True
                                    </SelectItem>
                                    <SelectItem value={"stockOut"}>
                                      False
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <Button type="submit" className="w-full bg-[#E07A5F]">
                                Update Product
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
                      onClick={() =>
                        handleDeleteProduct(product?._id as string)
                      }
                    >
                      <Delete size="18" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
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
    </div> : <div className="text-center p-10">
          <h2>No products available</h2>
        </div>}
    </>
  );
};

export default ManageProducts;
