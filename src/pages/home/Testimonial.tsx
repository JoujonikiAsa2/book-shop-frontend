import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiDoubleQuotesL } from "react-icons/ri";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Testimonial = () => {
  return (
    <div className="w-full pt-28">
      <SectionTitle
        title="Testimonials"
        description="Check out our featured products"
      />
      <div className="max-w-7xl mx-auto py-12 flex gap-4 justify-center items-center">
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
              items: 4,
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
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Card className="h-[370px] md:w-[300px] mx-[5px] rounded-none" key={index}>
              <CardTitle className="p-6 flex justify-between">
                <RiDoubleQuotesL className="text-2xl font-bold text-primary" />
                <div className="">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_R_vlnUz9UhylMPCccagw4dMqhbs4UMPAA&s" alt="" className="size-20 rounded-full"/>
                </div>
              </CardTitle>
              <CardHeader className="p-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit reiciendis ducimus sapiente, autem vel error
                  quisquam? Debitis necessitatibus voluptatem eligendi.
                </p>
              </CardHeader>
              <CardFooter className="p-0 flex justify-end items-end relative">
                <div>
                  <div className="w-[10%] h-12 bg-slate-400 rounded-ss-full rounded-ee-full absolute right-2 top-1"></div>
                  <div className="w-[10%] h-12 bg-purple-400 rounded-ss-full rounded-ee-full  absolute right-8 top-0 bottom-0 -rotate-45"></div>
                  <div className="w-[10%] h-12 bg-blue-400 rounded-ss-full rounded-ee-full absolute right-12 top-3 -rotate-90"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
