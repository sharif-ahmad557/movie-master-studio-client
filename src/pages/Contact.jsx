import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    toast.success("Message sent successfully! We will get back to you soon.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content py-10 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate__animated animate__fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about movies, subscriptions, or technical issues? Our
            team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side: Contact Information */}
          <div className="space-y-6 animate__animated animate__fadeInLeft">
            {/* Info Cards */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-primary">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Phone</h3>
                  <p className="text-gray-500">+880 123 456 7890</p>
                  <p className="text-xs text-gray-400">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="bg-secondary/10 p-4 rounded-full text-secondary">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Email</h3>
                  <p className="text-gray-500">support@movieportal.com</p>
                  <p className="text-xs text-gray-400">Online 24/7</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body flex-row items-center gap-4">
                <div className="bg-accent/10 p-4 rounded-full text-accent">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Location</h3>
                  <p className="text-gray-500">123 Movie Street, Dhaka</p>
                  <p className="text-xs text-gray-400">Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Google Map Embed (Optional but professional) */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 border border-base-300 mt-6">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301397!2d90.39108031536252!3d23.750858094680884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3b91bf%3A0xb272b2b1e84713!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1646830567890!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="card bg-base-100 shadow-2xl border border-base-300 animate__animated animate__fadeInRight">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium mb-2">
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered focus:input-primary w-full bg-base-200"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium mb-2">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered focus:input-primary w-full bg-base-200"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium mb-2">Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Inquiry about..."
                    className="input input-bordered focus:input-primary w-full bg-base-200"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium mr-2">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered focus:textarea-primary h-32 bg-base-200"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full text-white font-bold text-lg rounded-xl">
                    <FaPaperPlane className="mr-2" /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
