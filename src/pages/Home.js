import { useState } from "react";

export default function NibbleLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">

      {/* Background Image - Full Screen */}
      <img
        src="/climate image nibble.jpeg"
        alt="Climate environmental background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Optional Overlay (improves text readability) */}
      <div className="absolute inset-0 bg-black/40" />

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
  );
}