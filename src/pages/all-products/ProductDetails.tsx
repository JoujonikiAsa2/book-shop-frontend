/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { add } from "@/redux/features/orders/cartSlice";
import { useGetProductDetailsQuery } from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const dispatch = useDispatch();
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
      <div className="max-w-7xl h-[500px] mx-auto flex flex-col md:flex-row gap-10 bg-white shadow-md p-8 rounded-lg">
        <div className="w-1/3">
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-2/3">
          <h1 className="text-lg md:text-xl font-bold mb-4">{name}</h1>
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
            <span className="font-semibold text-gray-900">Price: </span>
            {price.toFixed(2)} Taka
          </div>
          <div className="flex gap-4">
            <div>
              <Button
                variant="outline"
                style={{ marginTop: "9px" }}
                className=" rounded-lg py-2 px-4"
                onClick={() => {
                 if(user){
                  dispatch(
                    add({ userId: user?.user as string, productId: _id })
                  );
                  toast.success("Add to cart successfully");
                 }
                 else{
                  toast.warning("Please Login", {duration: 3000});
                  setTimeout(() => {
                    navigate('/login')
                }, 3000);
                 }
                }}
              >
                Add to Cart
              </Button>
              <Link to={`/checkout/${id}`}>
                <Button
                  style={{ marginTop: "9px", marginLeft: "10px" }}
                  className=" rounded-lg py-2 px-4"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
