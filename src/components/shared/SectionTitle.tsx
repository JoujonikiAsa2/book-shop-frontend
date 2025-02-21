import '../../styles/animation.css'
const SectionTitle = ({title, description}: { title: string; description: string }) => {
  return (
    <div className="text-center float-right-animation">
      <h1 className="poppins-bold text xl lg:text-3xl font-bold poppins-semibold text-[#E07A5F]">
        {title}
      </h1>
      <p className='poppins-regular'>{description}</p>
    </div>
  );
};

export default SectionTitle;
