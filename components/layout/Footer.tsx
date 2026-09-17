"use client";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-6 md:px-10" style={{ borderColor: "#1E1E1E" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-mono text-[11px] tracking-wider" style={{ color: "#555" }}>
          © {new Date().getFullYear()} Pranav Auti · Hoboken, NJ
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/Pranav2112"              },
            { label: "LinkedIn", href: "https://linkedin.com/in/pranavauti"          },
            { label: "Email",    href: "mailto:pranavauti2003@gmail.com"             },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[11px] tracking-wider uppercase transition-colors duration-200"
              style={{ color: "#555" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9B89A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
