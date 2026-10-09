import Link from "next/link";
import { CONTACT, NAV } from "@/lib/site";
import { RESUME_HREF } from "@/lib/resume";
import Menu from "./Menu";
import styles from "./site.module.css";

export default function Header() {
  const links = [...NAV, { label: "Résumé", href: RESUME_HREF }, { label: "Contact", href: "/#contact" }];
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        Pranav Auti
      </Link>
      <nav aria-label="Main" className={styles.nav}>
        <ul className={styles.navList}>
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={styles.navLink}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Menu links={links} contact={CONTACT} />
    </header>
  );
}
