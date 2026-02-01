import PageHeader from "../components/PageHeader";
import PricingSection from "../components/PricingSection";
import CTA from "../components/CTA";
import { pricingData } from "../data/pricingData";

const Pricing = () => {
  return (
    <>
      <PageHeader
        title="Pricing & Packages"
        subtitle="Flexible packages designed to meet your business needs and budget"
      />

      {pricingData.map((category, i) => (
        <PricingSection key={i} category={category} />
      ))}

      <section className="bg-blackDark py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-textLight mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-textGray mb-8">
            Every business is unique. Let’s create a solution tailored for you.
          </p>
          <CTA />
        </div>
      </section>
    </>
  );
};

export default Pricing;
