import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blackDark via-blackMedium to-blackDark overflow-hidden">
      <h1 className="absolute text-yellowPrimary text-4xl md:text-6xl font-black text-center opacity-20">
        Creative Solutions for Business Growth
      </h1>

      <div className="relative z-10 text-center px-6">
        <p className="text-textGray text-lg mb-8 max-w-xl mx-auto">
          Video production, social media marketing & digital transformation
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-yellowPrimary text-black px-8 py-3 rounded font-bold shadow-yellowGlow"
          >
            Get Started
          </Link>
          <Link
            to="/portfolio"
            className="border-2 border-yellowPrimary text-yellowPrimary px-8 py-3 rounded font-bold"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
