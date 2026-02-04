import { Link } from "react-router-dom";

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative w-full max-w-sm bg-blackMedium border rounded-xl p-8 text-center transition
        ${
          plan.popular
            ? "border-yellowPrimary shadow-yellowGlow scale-105"
            : "border-grayBorder hover:border-yellowPrimary"
        }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellowPrimary text-black text-sm font-bold px-4 py-1 rounded">
          Most Popular
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-extrabold text-textLight mb-2">
        {plan.title}
      </h3>

      {/* Price */}
      {plan.price && (
        <div className="text-3xl font-extrabold text-yellowPrimary mb-2">
          {plan.price}
        </div>
      )}

      {/* Duration / Notes */}
      {plan.durationNote && (
        <p className="text-xs text-textGray mb-4">
          {plan.durationNote}
        </p>
      )}

      {plan.note && (
        <p className="text-xs text-textGray mb-4">
          {plan.note}
        </p>
      )}

      {/* Features */}
      <ul className="text-textGray text-left space-y-2 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-yellowPrimary font-bold">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className="inline-block w-full bg-yellowPrimary text-black font-bold py-3 rounded hover:bg-yellowBright transition"
      >
        Get Started
      </Link>
    </div>
  );
};

export default PricingCard;
