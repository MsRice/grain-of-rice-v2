import type { Metadata } from "next";
import Image from "next/image";
import patricePhoto from "../images/patrice_maxwell.png";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Software Engineer — Cloud Architecture, Payment Systems, Distributed Systems.",
};

const links = [
  { href: "https://www.linkedin.com/in/patrice-maxwell/", label: "LinkedIn" },
  { href: "https://github.com/MsRice", label: "GitHub" },
  { href: "/resume.pdf", label: "Resume" },
  { href: "https://thegrainofrice.com", label: "Portfolio" },
];

export default function NetworkingCard() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gor-deep-blue px-6">
      <div className="max-w-sm w-full text-center space-y-6">
        {/* Photo */}
        <Image
          src={patricePhoto}
          alt="Patrice Maxwell"
          className="w-32 h-32 rounded-full object-cover border-3 border-gor-yellow/30 mx-auto"
        />

        {/* Name */}
        <h1 className="text-4xl font-bold text-white">Patrice Maxwell</h1>

        {/* Headline */}
        <p className="text-lg text-gor-yellow font-medium">
          Software Engineer
        </p>

        {/* Short intro */}
        <p className="text-sm text-white/70 leading-relaxed">
          Building secure cloud-native payment systems at Nymbus.
          <br />
          Pursuing OMSCS at Georgia Tech.
        </p>

        {/* Current focus */}
        <p className="text-xs text-white/50">
          Focus: Cloud Architecture · Distributed Systems · AI Engineering
        </p>

        {/* Links */}
        <div className="pt-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 hover:border-gor-yellow/50 transition text-sm font-medium text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
