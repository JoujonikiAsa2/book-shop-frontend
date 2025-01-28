const SectionTitle = ({title, description}: { title: string; description: string }) => {
  return (
    <div className="text-center">
      <h1 className="text xl lg:text-3xl font-bold jost-semibold">
        {title}
      </h1>
      <p>{description}</p>
    </div>
  );
};

export default SectionTitle;
