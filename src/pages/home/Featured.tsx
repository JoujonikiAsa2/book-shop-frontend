/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCard } from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/redux/features/products/productApi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Featured = () => {
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(undefined);

  return (
    <div className="w-full pt-12">
      <div className="text-center">
        <h1 className="text xl lg:text-3xl font-bold jost-semibold">
          Featured Product
        </h1>
        <p>Check out our featured products</p>
      </div>
      <div className="max-w-7xl mx-auto py-12 flex flex-col justify-center items-center">
        {isFetching ? (
          <div className="w-full h-full flex justify-center items-center gap-2">
            {[1,2,3,4,5].map((_, index) => (
              <div className="flex flex-col space-y-3" key={index}>
                <Skeleton className="h-[205px] w-[220px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[220px]" />
                  <Skeleton className="h-4 w-[220px]" />
                  <Skeleton className="h-4 w-[20px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            // arrows
            autoPlaySpeed={3000}
            className="w-full h-full mx-[5px]"
            draggable={true}
            infinite={false}
            responsive={{
              superLargeDesktopp: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 1400 },
                items: 5,
              },
              superSmallMobile: {
                // the naming can be any, depends on you.
                breakpoint: { max: 550, min: 0 },
                items: 1,
              },
              desktop: {
                breakpoint: {
                  max: 1400,
                  min: 1024,
                },
                items: 4,
              },
              mobile: {
                breakpoint: {
                  max: 800,
                  min: 560,
                },
                items: 2,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 800,
                },
                items: 3,
              },
            }}
          >
            {productData?.data ? (
              productData?.data
                .slice(0, 6)
                .map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))
            ) : (
              <p>No books available</p>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Featured;
