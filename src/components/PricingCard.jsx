import { Link } from "react-router-dom";

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative bg-blackMedium border rounded-xl p-8 text-center transition
        ${
          plan.popular
            ? "border-yellowPrimary shadow-yellowGlow scale-105"
            : "border-grayBorder hover:border-yellowPrimary"
        }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellowPrimary text-black text-sm font-bold px-4 py-1 rounded">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-extrabold text-textLight mb-3">
        {plan.title}
      </h3>

      <div className="text-yellowPrimary font-bold mb-6">
        Contact for Quote
      </div>

      <ul className="text-textGray text-left space-y-2 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-yellowPrimary">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className="inline-block w-full bg-yellowPrimary text-black font-bold py-3 rounded hover:bg-yellowBright transition"
      >
        Get Quote
      </Link>
    </div>
  );
};

export default PricingCard;
