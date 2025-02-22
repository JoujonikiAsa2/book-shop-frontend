/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCard } from "@/components/shared/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/redux/features/products/productApi";
import { GoArrowUpRight } from "react-icons/go";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Featured = () => {
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(undefined);

  return (
    <div className="w-full pt-28">
      <SectionTitle title="Featured Product" description="Check out our featured products" />
      <div className="max-w-7xl mx-auto pt-12 flex flex-col justify-center items-center">
        {isFetching || isLoading ? (
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
            autoPlaySpeed={3000}
            className="w-full h-full mx-[5px]"
            draggable={true}
            autoPlay={true}
            infinite={true}
            responsive={{
              superLargeDesktopp: {
                breakpoint: { max: 4000, min: 1400 },
                items: 5,
              },
              superSmallMobile: {
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
      <div className="py-4 flex justify-center">
        <Link to="all-products"><Button variant="outline" className="hover:bg-[#E07A5F] hover:text-white">See More <GoArrowUpRight size={20}/></Button></Link>
      </div>
    </div>
  );
};

export default Featured;
