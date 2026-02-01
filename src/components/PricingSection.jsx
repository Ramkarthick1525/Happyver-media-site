import PricingCard from "./PricingCard";

const PricingSection = ({ category }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-textLight mb-12">
          {category.category}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {category.plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
