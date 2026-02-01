import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState(null); // success | error

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: simulate success
    setStatus("success");

    // Later: EmailJS / backend integration
  };

  return (
    <section className="bg-blackDark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-textLight mb-4">
              Contact Information
            </h2>

            <p className="text-textGray mb-8">
              We’re here to help bring your vision to life. Reach out to us through
              any of the following channels.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <span className="text-3xl">📧</span>
                <div>
                  <h4 className="font-bold text-textLight">Email</h4>
                  <a
                    href="mailto:happyvermedia@gmail.com"
                    className="text-yellowPrimary hover:underline"
                  >
                    happyvermedia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-bold text-textLight">Call & WhatsApp</h4>
                  <a
                    href="https://wa.me/919597224360"
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellowPrimary hover:underline"
                  >
                    95972 24360
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-blackMedium border border-grayBorder p-6 rounded-lg">
              <h3 className="text-lg font-bold text-textLight mb-2">
                Response Time
              </h3>
              <p className="text-textGray">
                We typically respond within 24–48 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-blackMedium border border-grayBorder rounded-xl p-8">
            <h2 className="text-3xl font-extrabold text-textLight mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name *"
                required
                className="w-full p-3 bg-blackDark border border-grayBorder rounded text-textLight focus:border-yellowPrimary outline-none"
              />

              <input
                type="email"
                placeholder="Your Email *"
                required
                className="w-full p-3 bg-blackDark border border-grayBorder rounded text-textLight focus:border-yellowPrimary outline-none"
              />

              <input
                type="tel"
                placeholder="Phone (optional)"
                className="w-full p-3 bg-blackDark border border-grayBorder rounded text-textLight"
              />

              <select
                required
                className="w-full p-3 bg-blackDark border border-grayBorder rounded text-textLight"
              >
                <option value="">Select a service</option>
                <option>Video Production & Editing</option>
                <option>Social Media Marketing</option>
                <option>Digital Transformation</option>
                <option>Creative Branding</option>
                <option>Multiple Services</option>
                <option>Other</option>
              </select>

              <textarea
                rows="5"
                placeholder="Your Message *"
                required
                className="w-full p-3 bg-blackDark border border-grayBorder rounded text-textLight"
              />

              <button
                type="submit"
                className="w-full bg-yellowPrimary text-black font-bold py-3 rounded-lg shadow-yellowGlow hover:bg-yellowBright transition"
              >
                Send Message
              </button>

              {status === "success" && (
                <div className="bg-green-600 text-white p-4 rounded text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-600 text-white p-4 rounded text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
