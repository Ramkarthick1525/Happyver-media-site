import { portfolioData } from "../data/portfolioData";

const PortfolioGallery = ({ activeFilter, openModal }) => {
  const filtered =
    activeFilter === "all"
      ? portfolioData
      : portfolioData.filter((i) => i.category === activeFilter);

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <div
              key={i}
              onClick={() => openModal(item)}
              className="group cursor-pointer bg-blackMedium rounded-xl overflow-hidden 
                         border border-grayBorder hover:border-yellowPrimary hover:shadow-yellow transition"
            >
              <div className="relative aspect-video flex items-center justify-center bg-blackLight">
                <div className="w-14 h-14 rounded-full bg-yellowPrimary text-black 
                                flex items-center justify-center font-bold text-xl
                                shadow-yellowGlow group-hover:scale-110 transition">
                  ▶
                </div>

                <div className="absolute inset-0 bg-black/70 opacity-0 
                                group-hover:opacity-100 transition flex flex-col 
                                justify-end p-4">
                  <h4 className="text-textLight font-bold">{item.title}</h4>
                  <p className="text-textGray text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
