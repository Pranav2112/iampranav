"use client";

import Link from "next/link";
import { useRef } from "react";
import styles from "./site.module.css";

type NavLink = { label: string; href: string };

/** Phone navigation: a native modal dialog, so focus trapping and Escape come from the browser. */
export default function Menu({
  links,
  contact,
}: {
  links: NavLink[];
  contact: { email: string; github: string; linkedin: string };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        Menu
      </button>
      <dialog ref={dialog} className={styles.menu} aria-label="Menu">
        <div className={styles.menuTop}>
          <Link href="/" className={styles.home} onClick={close}>
            Pranav Auti
          </Link>
          <button type="button" className={styles.menuButton} onClick={close} autoFocus>
            Close
          </button>
        </div>
        <nav aria-label="Main">
          <ul className={styles.menuList}>
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.menuLink} onClick={close}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.menuSmall}>
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={contact.github}>GitHub</a>
          <a href={contact.linkedin}>LinkedIn</a>
          <Link href="/lab" onClick={close}>
            Lab
          </Link>
        </p>
      </dialog>
    </>
  );
}
