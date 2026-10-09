import styles from "@/components/home/home.module.css";
import Opening from "@/components/home/Opening";
import SelectedWork from "@/components/home/SelectedWork";
import { AboutShort, Contact } from "@/components/home/AboutContact";

export default function Home() {
  return (
    <main id="main" className={styles.page}>
      <Opening />
      <SelectedWork />
      <AboutShort />
      <Contact />
    </main>
  );
}
