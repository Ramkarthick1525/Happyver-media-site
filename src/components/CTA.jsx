import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-yellowPrimary to-yellowBright py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
          Ready to Elevate Your Brand?
        </h2>

        <p className="text-lg md:text-xl text-black/80 mb-10 font-semibold">
          Let’s create something amazing together.
        </p>

        <Link
          to="/contact"
          className="inline-block bg-black text-yellowPrimary px-10 py-4 rounded-lg font-bold text-lg shadow-dark hover:bg-blackDark hover:shadow-yellowGlow transition"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
};

export default CTA;
