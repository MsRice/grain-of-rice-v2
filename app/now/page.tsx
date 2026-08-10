import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Patrice Maxwell",
  description: "What Patrice is focused on right now.",
};

export default function NowPage() {
  return (
    <main className="min-h-screen bg-gor-deep-blue px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Now</h1>
        <p className="text-white/50 text-sm mb-12">Updated August 2026</p>

        <Section title="Role">
          <p>
            Software Engineer at Nymbus — payment systems, Kubernetes, cloud
            infrastructure.
          </p>
        </Section>

        <Section title="Learning">
          <ul className="list-disc list-inside space-y-1">
            <li>OMSCS at Georgia Tech</li>
            <li>Architect Apprenticeship (16-week self-study)</li>
            <li>AWS Solutions Architect prep</li>
          </ul>
        </Section>

        <Section title="Building">
          <ul className="list-disc list-inside space-y-1">
            <li>thegrainofrice.com (this site)</li>
            <li>RiceLab — self-hosted homelab</li>
            <li>Personal MCP ecosystem</li>
          </ul>
        </Section>

        <Section title="Reading">
          <ul className="list-disc list-inside space-y-1">
            <li>Designing Data-Intensive Applications</li>
            <li>Building Microservices</li>
          </ul>
        </Section>

        <Section title="Upcoming">
          <ul className="list-disc list-inside space-y-1">
            <li>RenderATL — August 12, 2026</li>
            <li>AWS Solutions Architect certification</li>
          </ul>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/"
            className="text-gor-yellow text-sm hover:underline"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gor-yellow mb-3">{title}</h2>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </section>
  );
}
