import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blackDark/95 backdrop-blur border-b border-grayBorder">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-yellowPrimary font-extrabold text-lg tracking-tight"
          >
            Happyver Media Technologies
          </Link>

          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-0.5 bg-yellowPrimary"></span>
            <span className="w-6 h-0.5 bg-yellowPrimary"></span>
            <span className="w-6 h-0.5 bg-yellowPrimary"></span>
          </button>

          <ul className="hidden md:flex items-center gap-6 font-semibold text-textLight">
            <li><Link to="/" className="hover:text-yellowPrimary">Home</Link></li>
            <li><Link to="/services" className="hover:text-yellowPrimary">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-yellowPrimary">Portfolio</Link></li>
            <li><Link to="/pricing" className="hover:text-yellowPrimary">Pricing</Link></li>
            <li>
              <Link
                to="/contact"
                className="bg-yellowPrimary text-black px-4 py-2 rounded shadow-yellow"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {open && (
          <ul className="md:hidden flex flex-col gap-4 py-4 text-center text-textLight">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact" className="text-yellowPrimary font-bold">
              Contact
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
