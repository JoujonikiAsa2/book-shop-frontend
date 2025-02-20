/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCreateAnProductMutation } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/product";
import { FieldValues, useForm } from "react-hook-form";
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

const CreateProduct = () => {
  const form = useForm();
  const [createProduct] = useCreateAnProductMutation();

  const handleOrder = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Creating...");
    const productInfo: Partial<TProduct> = {
      name: data.name,
      author: data.author,
      imgUrl: data.imgUrl,
      price: data.price,
      category: data.category,
      description: data.description,
      quantity: data.quantity,
      availability: data.availability === "inStock" ? false : true,
    };
    try {
      const res = await createProduct(productInfo);
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        console.log(res.data.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="w-full min- min-h-[80vh] flex justify-center items-center p-16">
      <div className="w-[400px] bg-white p-12">
        <BSForm form={form} onSubmit={handleOrder}>
          <BSInput
            form={form}
            type="text"
            name="name"
            label="Book Name"
            required={true}
            className="border-gray-400 "
          />
          <BSInput
            form={form}
            type="text"
            name="author"
            label="Author Name"
            required={true}
            className="border-gray-400 "
          />
          <BSInput
            form={form}
            type="text"
            name="imgUrl"
            label="Image URL"
            required={true}
            className="border-gray-400 "
          />
          <BSInput
            form={form}
            type="number"
            name="price"
            label="Price"
            required={true}
            className="border-gray-400 "
          />
          <Select onValueChange={(value) => form.setValue("category", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"Fiction"}>Fiction</SelectItem>
                <SelectItem value={"Science"}>Science</SelectItem>
                <SelectItem value={"Poetry"}>Poetry</SelectItem>
                <SelectItem value={"SelfDevelopment"}>
                  SelfDevelopment
                </SelectItem>
                <SelectItem value={"Religious"}>Religious</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <BSInput
            form={form}
            type="text"
            name="description"
            label="Description"
            required={true}
            className="border-gray-400 "
          />
          <BSInput
            form={form}
            type="number"
            name="quantity"
            label="Quantity"
            required={true}
            className="border-gray-400 "
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"inStock"}>True</SelectItem>
                <SelectItem value={"stockOut"}>False</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit">Create Product</Button>
        </BSForm>
      </div>
    </div>
  );
};

export default CreateProduct;
