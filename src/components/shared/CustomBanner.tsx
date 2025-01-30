import SectionTitle from "./SectionTitle";

type TCustomBanner = {
    image: string;
    sectionTitle: string;
    description: string
}

const CustomBanner = ({image, sectionTitle, description}:TCustomBanner) => {
    return (
        <>
        <img src={image} alt="" className="h-[500px] w-full object-cover" />
        <div className="absolute bg-black p-10 opacity-30 inset-0 -z-0 h-[500px]"></div>
        <div className="absolute h-[180px] bg-white p-10 opacity-70 top-36 inset-2 md:inset-[10rem] lg:inset-36 ">
          <SectionTitle
            title={sectionTitle}
            description={description}
          />
        </div>
        </>
    );
};

export default CustomBanner;