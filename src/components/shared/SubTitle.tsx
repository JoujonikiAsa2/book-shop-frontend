const SubTitle = ({title, description}: { title: string; description: string }) => {
    return (
      <div className="text-center">
        <h1 className="text xl lg:text-xl font-bold poppins-semibold">
          {title}
        </h1>
        <p className="poppins-regular pt-10">{description}</p>
      </div>
    );
  };
  
  export default SubTitle;
  