import { Button } from "@/components/ui/button";
import banner from "../../assets/bg1.jpg";
import books from "../../assets/home.png";
function Banner() {
  return (
    <div style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover"}} className="relative z-10">
      <div className="absolute bg-black p-10  opacity-30 inset-0 -z-0 "></div>
      <div className="lg:h-[60vh] flex flex-col lg:flex-row justify-center text-center lg:text-left lg:justify-between items-center max-w-7xl mx-auto z-20">
        <div className="space-y-4 flex-1 pt-10 lg:pt-0">
          <h2 className="lg:text-4xl text-2xl font-bold jost-semibold">
            Discover Timeless Stories and Endless Adventures
          </h2>
          <p className="jost-regular">
            Your Journey into Literature Begins Here
          </p>
          <Button>See More</Button>
        </div>
        <div className="">
          <img src={books} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
