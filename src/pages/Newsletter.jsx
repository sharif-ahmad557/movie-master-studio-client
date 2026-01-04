import React from "react";
import { toast } from "react-hot-toast";
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "animate.css";

const Newsletter = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      e.target.reset();
    }
  };

  return (
    <div
      ref={ref}
      className={`w-full py-20 bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 transition-colors duration-300`}
    >
      <div className="w-11/12 max-w-4xl mx-auto text-center bg-base-100 p-8 md:p-12 rounded-3xl shadow-xl border border-base-200">
        <div
          className={`mb-6 flex justify-center ${
            inView ? "animate__animated animate__bounceIn" : "opacity-0"
          }`}
        >
          <div className="bg-primary/20 p-4 rounded-full text-primary">
            <FaEnvelopeOpenText size={40} />
          </div>
        </div>

        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            inView ? "animate__animated animate__fadeInUp" : "opacity-0"
          }`}
        >
          Subscribe to our <span className="text-primary">Newsletter</span>
        </h2>

        <p
          className={`text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto ${
            inView
              ? "animate__animated animate__fadeInUp animate__delay-1s"
              : "opacity-0"
          }`}
        >
          Get the latest movie updates, exclusive reviews, and hidden gems
          delivered straight to your inbox. No spam, we promise!
        </p>

        <form
          onSubmit={handleSubscribe}
          className={`flex flex-col sm:flex-row gap-3 max-w-lg mx-auto ${
            inView
              ? "animate__animated animate__fadeInUp animate__delay-2s"
              : "opacity-0"
          }`}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered input-primary w-full rounded-full px-6 bg-base-200 focus:bg-base-100 transition-all"
            required
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full px-8 text-white hover:scale-105 transition-transform"
          >
            Subscribe <FaPaperPlane className="ml-2 text-xs" />
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          By subscribing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
