import Image from "next/image";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import patricePhoto from "./images/patrice_maxwell.png";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />

      {/* About section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24 bg-gor-mid-blue">
        <div className="max-w-3xl flex flex-col md:flex-row items-center gap-12">
          <Image
            src={patricePhoto}
            alt="Patrice Maxwell"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-gor-yellow/30 shrink-0"
          />
          <div>
            <h2 className="text-3xl font-bold text-gor-yellow mb-6">About</h2>
            <p className="text-white/85 text-lg leading-relaxed mb-4">
              I&apos;m Patrice Maxwell, a software engineer who enjoys turning complex
              problems into thoughtful, dependable systems.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              My work currently centers on cloud-native payment infrastructure, application
              security, distributed systems, and AI-assisted development. I&apos;m also
              pursuing a master&apos;s degree in computer science at Georgia Tech, where
              I&apos;m continuing to deepen my understanding of operating systems,
              architecture, and scalable software.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Outside of work, I&apos;m usually exploring a trail, building something in
              RiceLab, developing ideas for GoRTech, or finding new ways to bring technology
              and community together.
            </p>
            <p className="text-white/90 leading-relaxed italic">
              I approach engineering with curiosity, empathy, and a genuine love of
              learning — committed to the joy of it all.
            </p>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 bg-gor-deep-blue">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gor-yellow mb-6">Projects</h2>
          <p className="text-white/60 text-sm mb-10">Coming soon — engineering case studies.</p>
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard title="RiceFlix" description="Streaming platform built with microservices architecture." />
            <ProjectCard title="RiceLab" description="Self-hosted homelab running Kubernetes." />
            <ProjectCard title="The Grain of Rice" description="This site — Next.js, Tailwind, Vercel." />
            <ProjectCard title="One Grain" description="Personal MCP ecosystem and AI tooling." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#e0e0e0] text-center">
        {/* Logo */}
        <p className="text-3xl font-bold text-[#5a9bbf] mb-6" style={{ textShadow: "0 0 12px rgba(100,180,230,0.6)" }}>
          PM
        </p>

        {/* Links */}
        <nav className="flex justify-center gap-8 mb-8">
          <a href="https://github.com/patricemaxwell" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-gor-top-blue transition-colors text-lg">
            Github
          </a>
          <a href="https://www.linkedin.com/in/patrice-maxwell/" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-gor-top-blue transition-colors text-lg">
            LinkedIn
          </a>
          <a href="/patricemaxwell" className="text-zinc-700 hover:text-gor-top-blue transition-colors text-lg">
            Contact
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-gor-top-blue transition-colors text-lg">
            Resume
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-zinc-500 text-sm">
          Copyright © Patrice Maxwell
        </p>
      </footer>
    </main>
  );
}

function ProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-white/10 rounded-lg p-6 text-left hover:border-gor-teal/50 transition-colors flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white/40 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

