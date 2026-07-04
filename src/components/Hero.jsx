import { Link } from "react-router-dom";
import logo from "../assets/image.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0F19] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.08),transparent_60%)]" />

      {/* Logo as TRUE background */}
      <img
        src={logo}
        alt="Company Logo"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] md:w-[40%] opacity-[0.14] rounded-full blur-[0.5px] pointer-events-none mix-blend-screen drop-shadow-[0_0_100px_rgba(255,204,0,0.45)] z-0"
        style={{
          animation: "pulse 12s ease-in-out infinite",
        }}
      />

      {/* Content OVER the logo */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-yellowPrimary/90 text-4xl md:text-6xl font-black mb-96 leading-tight">
          Creative Solutions for Business Growth
        </h1>

        <p className="text-textGray text-lg mb-10">
          Video production, social media marketing & digital transformation
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-yellowPrimary text-black px-8 py-3 rounded font-bold shadow-yellowGlow"
          >
            Get Started
          </Link>

          
            < a href="#featured-portfolio"
            className="border-2 border-yellowPrimary text-yellowPrimary px-8 py-3 rounded font-bold"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;