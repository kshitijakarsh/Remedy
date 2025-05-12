import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { any } from "zod";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Home: React.FC = (): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl font-poppins text-pharmacy-primary">
              Remedy
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-pharmacy-primary font-poppins transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-pharmacy-primary font-poppins transition-colors duration-300"
            >
              Benefits
            </a>
          </div>
          <button
            className="bg-pharmacy-primary hover:bg-pharmacy-secondary text-white font-poppins py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pharmacy-primary focus:ring-offset-2"
            onClick={() => {
              authenticated ? navigate("/dashboard") : navigate("/signup");
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="pt-52 pb-16 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Modern Pharmacy Management Made{" "}
              <span className="text-pharmacy-primary">Simple</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Streamline your pharmacy operations with our comprehensive digital
              solution. From inventory control to customer management, Remedy
              helps you focus on what truly matters - your patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-pharmacy-primary hover:bg-pharmacy-secondary text-white font-poppins py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Request Demo
              </button>
              <button className="bg-white text-pharmacy-primary font-poppins py-3.5 px-8 rounded-full border-2 border-pharmacy-primary hover:bg-pharmacy-primary hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/dashboard.png"
              alt="Pharmacy Management Dashboard"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-white to-pharmacy-light/30"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run your pharmacy efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Feature
              icon={
                <svg
                  className="h-10 w-10 text-pharmacy-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              }
              title="Inventory Management"
              description="Add, update, and monitor medicines with real-time stock alerts and expiry notifications."
            />
            <Feature
              icon={
                <svg
                  className="h-10 w-10 text-pharmacy-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2"
                  />
                </svg>
              }
              title="Sales & Billing"
              description="Process transactions quickly with automated invoice generation and maintain detailed sales history."
            />
            <Feature
              icon={
                <svg
                  className="h-10 w-10 text-pharmacy-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              title="Analytics & Reports"
              description="Visualize sales performance, monitor stock levels, and identify trends with clean, interactive dashboards."
            />
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose Remedy
              </h2>
              <p className="text-xl text-gray-600">
                Our system ensures accuracy, efficiency, and better service
                delivery, enabling pharmacies to focus on what matters most.
              </p>
              <ul className="space-y-6">
                {/* Keep your existing benefits list with enhanced styling */}
              </ul>
            </div>
            <div className="md:w-1/2">
              <img
                src="/Analytics.png"
                alt="Remedy Dashboard Preview"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-pharmacy-primary via-pharmacy-secondary to-pharmacy-primary bg-[length:200%_100%] animate-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Transform Your Pharmacy?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join hundreds of pharmacies already using Remedy to streamline
            operations and enhance customer service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-pharmacy-primary hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Schedule a Demo
            </button>
            <button className="bg-transparent text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full border-2 border-white transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Footer content */}
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Component
const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
      <div className="flex items-center mb-6">
        <div className="bg-pharmacy-light/50 p-4 rounded-xl">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Home;
