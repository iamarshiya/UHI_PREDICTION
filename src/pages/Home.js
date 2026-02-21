import { useState } from "react";

const NibbleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="D:\UHI_PREDICTION\public\green-illustration-icon.jpeg">
    <circle cx="20" cy="20" r="20" fill="#22c55e" />
    <path
      d="M20 8 C14 8 10 13 10 18 C10 22 12 25 16 27 C14 29 13 31 14 33 C16 31 18 30 20 30 C22 30 24 31 26 33 C27 31 26 29 24 27 C28 25 30 22 30 18 C30 13 26 8 20 8Z"
      fill="white"
      opacity="0.9"
    />
    <ellipse cx="20" cy="18" rx="5" ry="6" fill="#22c55e" />
  </svg>
);

export default function NibbleLanding() {
  return (
    <div className="min-h-screen font-sans bg-white">

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* Background Image using URL */}
        <img
          src="/climate image nibble.jpeg"
          alt="Climate environmental background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay (optional but recommended for readability) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white leading-snug drop-shadow-2xl">
            AI-Powered{" "}
            <span className="bg-white text-gray-900 px-2 py-0.5 leading-relaxed inline">
              Environmental
            </span>
            <br />
            Risk Prediction
            <br />
            for Smarter Cities
          </h1>
        </div>
      </div>
    </div>
  );
}