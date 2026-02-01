const filters = [
  { key: "all", label: "All Projects" },
  { key: "video", label: "Video Production" },
  { key: "social", label: "Social Media" },
  { key: "branding", label: "Branding" },
  { key: "digital", label: "Digital Transformation" },
];

const PortfolioFilter = ({ active, setActive }) => {
  return (
    <section className="bg-blackDark border-b border-grayBorder py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-4 py-2 rounded font-semibold transition
                ${
                  active === f.key
                    ? "bg-yellowPrimary text-black shadow-yellow"
                    : "bg-blackMedium text-textLight border border-grayBorder hover:border-yellowPrimary"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioFilter;
