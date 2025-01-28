const SubTitle = ({title, description}: { title: string; description: string }) => {
    return (
      <div className="text-center">
        <h1 className="text xl lg:text-xl font-bold jost-semibold">
          {title}
        </h1>
        <p>{description}</p>
      </div>
    );
  };
  
  export default SubTitle;
  