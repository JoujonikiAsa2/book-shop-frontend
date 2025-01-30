/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetProductDetailsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/product";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export interface TProductDetails {
  imgUrl: string;
  name: string;
  description: string;
  category: string;
  price: number;
  author: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isFetching } = useGetProductDetailsQuery(
    id as string
  );
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  const { _id, imgUrl, name, description, category, price, author }: TProduct =
    data?.data;

  return (
    <div className="bg-gray-100 h-[100vh] flex items-center">
      <div className="max-w-7xl h-[500px] mx-auto flex gap-10 bg-white shadow-md p-8 rounded-lg">
        <div className="w-1/3">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-2/3">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div className="mb-2">
            <span className="font-semibold text-gray-900">Author:</span>{" "}
            {author}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-900">Category:</span>{" "}
            {category}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-900">Price:</span>
            {price.toFixed(2)} Taka
          </div>
          <div className="flex gap-4">
            <div>
              <Button
              variant="outline"
                style={{ marginTop: "9px" }}
                className=" rounded-lg py-2 px-4"
              >
                Add to Cart
              </Button>
            </div>
            <Link to={`/checkout/${_id}`}>
              <Button
                style={{ marginTop: "9px" }}
                className=" rounded-lg py-2 px-4"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
