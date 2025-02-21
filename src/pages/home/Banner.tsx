import { Button } from "@/components/ui/button";
import "../../styles/animation.css";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <div
      style={{
        background: "#003C3C",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="relative z-10 h-[100vh] lg:h-[80vh]"
    >
      <div className="w-full h-full">
        <div className="h-full flex flex-col lg:flex-row justify-center text-center lg:text-left lg:justify-between items-center">
          <div className="lg:w-1/2 lg:h-full rounded-r-full flex justify-center items-center text-white">
            <div className=" space-y-4 lg:w-[30rem] pt-10 lg:pt-0">
              <h2 className="lg:text-4xl text-2xl font-bold poppins-semibold">
                Discover Timeless Stories and Endless Adventures
              </h2>
              <p className="poppins-regular">
                Your Journey into Literature Begins Here
              </p>
              <div className="">
              <Link to="/all-products"><Button className="bg-[#E07A5F] text-white hover:bg-[#E07A5F]/80">Buy now</Button></Link>
              </div>
            </div>
          </div>
          <div className="px-10 pt-10 lg:p-0  lg:bg-[#497D74] w-full lg:w-1/2 h-full lg:rounded-l-full flex justify-center z-0">
            <img
              src="https://gramentheme.com/html/bookle/assets/img/hero/hero-girl.png"
              alt=""
              className="shake-animation h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
