const ServiceDetail = ({ service }) => {
  return (
    <section
      id={service.id}
      className={`py-20 ${
        service.dark ? "bg-blackDark" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <span className="inline-block bg-yellowPrimary text-black text-sm font-bold px-4 py-1 rounded mb-4">
          {service.badge}
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-textLight mb-4">
          {service.title}
        </h2>

        <p className="text-textGray max-w-3xl mb-10 text-lg">
          {service.intro}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {service.features.map((f, i) => (
            <div
              key={i}
              className="bg-blackMedium border border-grayBorder rounded-lg p-6 hover:border-yellowPrimary transition"
            >
              <h4 className="text-lg font-bold text-textLight mb-2">
                {f.title}
              </h4>
              <p className="text-textGray">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
