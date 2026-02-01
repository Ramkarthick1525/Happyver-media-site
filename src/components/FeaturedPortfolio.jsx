const portfolioItems = [
  { title: "Brand Film", desc: "Corporate storytelling" },
  { title: "Social Media Reels", desc: "Viral content creation" },
  { title: "Promotional Video", desc: "Product launch campaign" },
  { title: "Ad Creative", desc: "Short-form advertising" },
];

const FeaturedPortfolio = () => {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-textLight mb-4">
          Featured Work
        </h2>

        <p className="text-textGray text-center mb-14 text-lg">
          See what we’ve created for our clients
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className="bg-blackMedium rounded-xl overflow-hidden border border-grayBorder 
                         hover:border-yellowPrimary hover:shadow-yellow transition"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video flex items-center justify-center bg-blackLight">
                <div
                  className="w-14 h-14 rounded-full bg-yellowPrimary text-black 
                             flex items-center justify-center text-xl font-bold 
                             shadow-yellowGlow hover:scale-110 transition cursor-pointer"
                >
                  ▶
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-textLight mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-textGray">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;
