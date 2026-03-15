import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Placeholder sections for scroll & nav testing */}
      <section id="about" className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-4xl font-bold text-zinc-700">About — Coming Next</h2>
      </section>
      <section id="skills" className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-4xl font-bold text-zinc-700">Skills — Coming Next</h2>
      </section>
      <section id="projects" className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-4xl font-bold text-zinc-700">Projects — Coming Next</h2>
      </section>
      <section id="contact" className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-4xl font-bold text-zinc-700">Contact — Coming Next</h2>
      </section>
    </main>
  );
}
