import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />

      <section id="projects" className="min-h-screen bg-black px-6 py-24">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-3 text-white/70">
          Next: horizontal scroll + 3D tilt project cards + hover reveal.
        </p>
      </section>
    </main>
  );
}
