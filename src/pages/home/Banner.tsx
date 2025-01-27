import { Button } from "@/components/ui/button";
import banner from "../../assets/bg1.jpg";
import books from "../../assets/books.png";
function Banner() {
  return (
    <div style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}>
      <div className="h-[60vh] flex flex-col lg:flex-row justify-center text-center lg:justify-between items-center max-w-7xl mx-auto">
        <div className="space-y-4">
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
