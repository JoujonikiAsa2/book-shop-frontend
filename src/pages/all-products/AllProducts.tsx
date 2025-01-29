/* eslint-disable @typescript-eslint/no-unused-vars */
import CardSkeleton from "@/components/shared/CardSkeleton";
import CustomBanner from "@/components/shared/CustomBanner";
import { ProductCard } from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/product";
import image from "../../assets/products.jpg";

const AllProducts = () => {
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(undefined);
  return (
    <div>
        <div className="relative">
            <CustomBanner image={image} sectionTitle="Products" description="All products are available here" />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-6">
        {productData?.data?.map((item: TProduct) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
      {isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-6">
          {[1,2,3,4,5,6].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
