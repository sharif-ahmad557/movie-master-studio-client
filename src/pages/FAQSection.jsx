import React from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const faqs = [
  {
    question: "Is MovieMaster Studio free to use?",
    answer:
      "Yes! browsing movies and viewing details is completely free. However, creating a personal collection requires a free account registration.",
  },
  {
    question: "How do I add a movie to my collection?",
    answer:
      "After logging in, navigate to the 'Add Movie' page from the menu. Fill in the movie details like title, genre, and poster URL, then click 'Add Movie'.",
  },
  {
    question: "Can I delete a movie I added?",
    answer:
      "Absolutely. You can manage your own added movies from the 'My Collection' page. You will see delete and update options there.",
  },
  {
    question: "Is there a dark mode available?",
    answer:
      "Yes! We support both Light and Dark modes. You can toggle the theme using the sun/moon icon in the navbar.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to us via the 'Contact Us' page or email us directly at support@moviemaster.com.",
  },
];

const FAQSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="w-full bg-base-200 text-base-content py-20 transition-colors duration-300"
    >
      <div className="w-11/12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-all ${
                inView ? "animate__animated animate__fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-medium text-primary">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600 dark:text-gray-300">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
