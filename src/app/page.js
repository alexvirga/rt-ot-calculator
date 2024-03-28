import styles from "./page.module.css";
import Calculator from "./calculator";

export default function Home() {
  return (
    <main className={styles.main}>
      <Calculator />
    </main>
  );
}
