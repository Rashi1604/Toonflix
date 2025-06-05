
import React, { useEffect, useState } from "react";
import ContinueVideos from "./ContinueVideos";

export default function HeroSection() {
  const headingText = "Bienvenue sur ToonFlix";
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    setAnimate(true);
  }, []);

  return (
    <>
      <section className="min-h-[75vh] flex items-center pt-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text Content */}
          <div className="text-center md:text-left">
            <img
              src="teddy.png"
              alt="Teddy"
              className="h-10 md:h-16 lg:h-20 mb-4 mx-auto md:mx-0"
            />

            {/* Animated Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#EF7D00] leading-tight drop-shadow-md flex flex-wrap">
              {headingText.split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-opacity transform duration-300 ${
                    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 0.09}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Plongez dans un monde de plaisir, de rires et d'apprentissage avec <strong>ToonFlix</strong>— votre destination ultime pour les dessins animés préférés des enfants ! Des aventures colorées aux récits créatifs, nos émissions soigneusement sélectionnées sont conçues pour divertir, inspirer et stimuler l’imagination de chaque enfant.
            </p>

            <button
              className="mt-6 bg-[#EF7D00] hover:bg-[#f9904a] text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
              onClick={() => {
                const element = document.getElementById("cards-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              explorer maintenant
            </button>
          </div>

          {/* Right: Blob-style Cartoon Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-pink-200 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden shadow-lg">
              <img
                src="c1.avif"
                alt="Cartoon 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-blue-300 rounded-[70%_30%_60%_40%/50%_60%_30%_70%] overflow-hidden shadow-lg">
              <img
                src="c2.avif"
                alt="Cartoon 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ContinueVideos />
    </>
  );
}
