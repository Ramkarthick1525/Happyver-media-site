const services = [
  { icon: "🎬", title: "Video Production", desc: "Reels, ads & brand films" },
  { icon: "📱", title: "Social Media Marketing", desc: "Growth-focused content" },
  { icon: "🚀", title: "Digital Transformation", desc: "Offline to online" },
  { icon: "✨", title: "Creative Branding", desc: "Stories that sell" },
];

const ServicesOverview = () => {
  return (
    <section className="bg-blackDark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-textLight mb-4">
          Our Services
        </h2>
        <p className="text-textGray text-center mb-12">
          Comprehensive solutions for your digital presence
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-blackMedium p-6 rounded-xl border border-grayBorder hover:border-yellowPrimary hover:shadow-yellow transition"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-textLight mb-2">
                {s.title}
              </h3>
              <p className="text-textGray">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
