/* eslint-disable no-unsafe-optional-chaining */
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { add } from "@/redux/features/orders/cartSlice";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product";
import { Loader, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
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
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const dispatch = useDispatch();

  const { data: productData } = useGetProductsQuery(undefined)

  const { data, isLoading, isFetching } = useGetProductDetailsQuery(
    id as string
  );
  const cartProducts = useAppSelector((state) => state.cart.products);
  const [disable, setDisable] = useState<boolean>(false);
  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  const {
    _id,
    imgUrl,
    name,
    description,
    quantity,
    category,
    price,
    author,
  }: TProduct = data?.data;

  const productQuantity = cartProducts?.filter(
    (product) => product.product == _id
  );

  return (
    <div className="flex items-center">
      <div className="lg:w-9/12  mx-auto  flex flex-col md:flex-row gap-10 bg-white p-4 lg:p-8">
        <div className="w-full lg:w-1/3">
          <img
            src={imgUrl}
            alt={name}
            className="w-[300px] lg:w-[400px] h-[300px] lg:h-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="text-lg md:text-xl font-bold mb-4 poppins-semibold">
            {name}
          </h1>
          <p>
            <span className="poppins-medium text-gray-700  ">by</span> &nbsp;{" "}
            <span className="uppercase text-gray-500"> {author}</span>
          </p>
          <p className="pb-6">
            <span className="poppins-medium text-gray-700  ">Category:</span>{" "}
            &nbsp; <span className="uppercase text-gray-500">{category}</span>
          </p>
          <p className="text-sm mb-4 text-gray-500">{description}</p>
          <div className="space-y-2 pt-4">
            <p className="pb-6">
              <span className="poppins-medium uppercase text-gray-700  ">
                Price:
              </span>{" "}
              &nbsp;{" "}
              <span className="uppercase text-[#E07A5F] text-xl">
                &#2547;{price.toFixed(2)}
              </span>{" "}
            </p>
          </div>
          <div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                disabled={disable}
                className=" rounded-lg py-2 px-4 "
                onClick={() => {
                  if (user && productQuantity[0]?.quantity !== quantity) {
                    dispatch(
                      add({ userId: user?.user as string, productId: _id })
                    );
                    toast.success("Add to cart successfully");
                  } else if (productQuantity[0]?.quantity === quantity) {
                    toast.warning("Insufficient Stock");
                    setDisable(true);
                  } else {
                    toast.warning("Please Login", { duration: 3000 });
                    setTimeout(() => {
                      navigate("/login");
                    }, 3000);
                  }
                }}
              >
                <ShoppingCartIcon/>
                Add to Cart
              </Button>
              <Link to={`/checkout/${id}`}>
                <Button
                  className="bg-[#E07A5F] text-white hover:bg-[#E07A5F]/80 rounded-lg py-2 px-4"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 gap-4 border p-2">
          <div className="bg-[#E07A5F] text-white text-center py-2">
            <p className="poppins-semibold">Featured Books</p>
          </div>
          {productData?.data?.slice(0, 4).map((product) => (
            <div className="border flex items-center gap-4 p-1" key={product?._id}>
              <img
                src={product?.imgUrl}
                alt=""
                className="w-[100px] h-[100px] object-cover shadow-lg"
              />
              <div className="text-xs">
                <p className="font-semibold">{product?.name?.slice(0, 30)}...</p>
                <p className="text-gray-400">{product?.category}</p>
                <p className="text-gray-400">&#2547;{product?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
