import heroBackground from "../images/hero_background.png";

export default function Hero() {
  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center text-center relative bg-gor-deep-blue bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground.src})` }}
    >

      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Patrice Maxwell
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/80 font-light">
          Building software worth sharing.
        </p>

        {/* Down arrow */}
        <a
          href="#about"
          className="mt-16 inline-block text-white/50 hover:text-white transition-colors animate-slow-bounce"
          aria-label="Scroll to about section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
