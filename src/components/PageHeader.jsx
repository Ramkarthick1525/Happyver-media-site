const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="bg-gradient-to-br from-blackDark via-blackMedium to-blackDark py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-textLight mb-4">
          {title}
        </h1>
        <p className="text-textGray text-lg md:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;
