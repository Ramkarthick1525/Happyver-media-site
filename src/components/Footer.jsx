import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blackDark text-textLight pt-20 pb-8 border-t border-grayBorder">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold text-yellowPrimary mb-3">
              Happyver Media Technologies
            </h3>
            <p className="text-textGray leading-relaxed">
              Transforming brands through creative video and digital marketing
              solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellowPrimary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellowPrimary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-yellowPrimary transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-yellowPrimary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellowPrimary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-textGray mb-2">
              Email:{" "}
              <a
                href="mailto:happyvermedia@gmail.com"
                className="text-yellowPrimary hover:underline"
              >
                happyvermedia@gmail.com
              </a>
            </p>
            <p className="text-textGray">
              Call / WhatsApp:{" "}
              <a
                href="https://wa.me/919597224360"
                target="_blank"
                rel="noreferrer"
                className="text-yellowPrimary hover:underline"
              >
                95972 24360
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-6 border-t border-grayBorder text-sm text-textGray">
          © {new Date().getFullYear()} Happyver Media Technologies. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
