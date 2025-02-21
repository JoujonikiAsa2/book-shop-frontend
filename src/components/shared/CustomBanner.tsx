import SectionTitle from "./SectionTitle";

type TCustomBanner = {
    image: string;
    sectionTitle: string;
    description: string
}

const CustomBanner = ({image, sectionTitle, description}:TCustomBanner) => {
    return (
        <>
        <img src={image} alt="" className="h-[70vh] w-full object-cover image-animation" />
        <div className="absolute bg-black p-10 opacity-30 inset-0 -z-0 h-[70vh]"></div>
        <div className="absolute lg:w-[80vw] h-[180px] bg-white p-10 opacity-70 inset-0 lg:translate-x-[10vw] translate-y-[35vw] lg:translate-y-[25vh] z-10  ">
          <SectionTitle
            title={sectionTitle}
            description={description}
          />
        </div>
        </>
    );
};

export default CustomBanner;