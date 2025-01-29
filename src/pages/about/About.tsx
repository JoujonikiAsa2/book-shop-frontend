import image from "../../assets/about.jpg";
import goal from "../../assets/goal.jpg";
import question from "../../assets/question.jpg";
import SubTitle from "@/components/shared/SubTitle";
import CustomBanner from "@/components/shared/CustomBanner";
const About = () => {
  return (
    <div>
      <div className=" w-full ">
        <div className="pb-12 relative">
            <CustomBanner
            image={image}
              sectionTitle="About"
              description=" Welcome to InkSpire, where stories come alive and knowledge knows no
            bounds"
            />
        </div>
        <div className="p-6 right-0 bottom-0 pt-12 flex justify-center ">
          <section className="py-8 px-4 w-full max-w-7xl flex flex-col gap-10 relative">
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-20">
              <div className="lg:w-[40%] bg-white border p-12 lg:p-20">
                <SubTitle title="Our Mission" description=""></SubTitle>
                <p className="mb-6">
                  Our mission is to foster a love of reading and create a space
                  where book lovers can discover, connect, and grow. We aim to
                  make books accessible to all and celebrate the joy they bring
                  to our lives.
                </p>
              </div>
              <img src={goal} alt="" className="size-72 rounded-full border" />
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20">
            <img src={question} alt="" className="size-72 border rounded-full" />
              <div className="lg:w-[40%] bg-white border p-12 lg:p-20">
                <SubTitle title="Why Choose Us" description=""></SubTitle>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>
                    <strong>Curated Selection:</strong> We take pride in
                    offering books that cater to all tastes and preferences.
                  </li>
                  <li>
                    <strong>Personalized Service:</strong> Need recommendations?
                    Our team of book enthusiasts is here to help you find the
                    perfect read.
                  </li>
                  <li>
                    <strong>Community Hub:</strong> Beyond books, we host events
                    like author signings, book clubs, and workshops to bring our
                    community together.
                  </li>
                </ul>
              </div>
            </div>
            <div className=" max-w-[55rem] mx-auto border p-12 lg:p-20">
              <SubTitle title="More Than a Bookshop" description=""></SubTitle>
              <p>
                We’re not just a store; we’re a haven for book lovers, a retreat
                for the curious, and a gathering place for ideas. Whether you
                visit us in-store or online, we’re here to help you explore the
                world, one page at a time.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
