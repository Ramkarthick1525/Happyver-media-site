import PricingCard from "./PricingCard";

const PricingSection = ({ category }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-textLight mb-12">
          {category.category}
        </h2>

        <div
  className={` grid gap-8 justify-center md:mx-52
    ${
      category.plans.length === 1
        ? "grid-cols-1 md:ml-96"
        : category.plans.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3"
    }
  `}
>
  {category.plans.map((plan, i) => (
    <PricingCard key={i} plan={plan} />
  ))}
</div>

      </div>
    </section>
  );
};

export default PricingSection;
