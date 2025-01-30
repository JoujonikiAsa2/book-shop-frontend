/* eslint-disable @typescript-eslint/no-unused-vars */
import CardSkeleton from "@/components/shared/CardSkeleton";
import CustomBanner from "@/components/shared/CustomBanner";
import { ProductCard } from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/product";
import image from "../../assets/products.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { FieldValues, useForm } from "react-hook-form";
import { TQueryParam } from "@/types/global";

const AllProducts = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const form = useForm();
  const { resetField } = form;

  const {
    data: productData,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductsQuery(params, { refetchOnMountOrArgChange: true });

  const totalPages = productData?.meta?.totalPage || 0;

  const queryParam: TQueryParam[] = [];

  const handleSearch = (data: FieldValues) => {
    queryParam.push({ name: "searchTerm", value: data.search });
    setParams(queryParam);
    refetch();
    resetField("search", { defaultValue: "" });
  };
  const handleFilter = (data: FieldValues) => {
    queryParam.push(
      { name: "minPrice", value: data.minPrice },
      { name: "maxPrice", value: data.maxPrice }
    );
    setParams(queryParam);
    refetch();
    resetField("minPrice", { defaultValue: "" });
    resetField("maxPrice", { defaultValue: "" });
  };

  console.log("total pages", totalPages, productData);
  return (
    <div>
      <div className="relative">
        <CustomBanner
          image={image}
          sectionTitle="Products"
          description="All products are available here"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 pt-28 pb-10">
        <div>
          <BSForm form={form} onSubmit={handleSearch}>
            <div className="flex gap-2 items-center">
              <BSInput
                type="text"
                name="search"
                placeholder="Search by name, author, category"
                form={form}
                className="w-72 "
              ></BSInput>
              <Button type="submit" style={{ marginTop: "9px" }}>
                Search
              </Button>
            </div>
          </BSForm>
        </div>
        <div className="flex gap-2">
        <Button variant={"outline"} style={{ marginTop: "9px" }} onClick={()=>{
          queryParam.push({ name: "availability", value: "true" });
          setParams(queryParam);
          refetch();
        }}>
                In Stock
              </Button>
          <BSForm form={form} onSubmit={handleFilter}>
            <div className="flex gap-2 items-center">
              <BSInput
                type="text"
                name="minPrice"
                placeholder="Minimum Price"
                form={form}
                className="w-32 "
              ></BSInput>
              <BSInput
                type="text"
                name="maxPrice"
                placeholder="Maximum Price"
                form={form}
                className="w-32 "
              ></BSInput>
              <Button type="submit" style={{ marginTop: "9px" }}>
                Filter
              </Button>
            </div>
          </BSForm>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-6">
        {productData?.data?.map((item: TProduct) => (
          <ProductCard key={item._id} product={item} />
        ))}
        {isLoading ||
          (isFetching && (
            <>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                (item: number) => (
                  <CardSkeleton key={item} />
                )
              )}
            </>
          ))}
      </div>

      <div className="flex justify-center items-center gap-2 pb-4">
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (item: number, index: number) => (
              <Button
                key={index}
                variant={"outline"}
                onClick={() => {
                  queryParam.push({ name: "page", value: item });
                  setParams(queryParam);
                }}
              >
                {item}
              </Button>
            )
          )}
        </div>
        <div>
          <Input
            type="number"
            placeholder="page"
            className="w-40"
            onChange={(e) => {
              queryParam.push({ name: "page", value: e.target.value });
              setParams(queryParam);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
