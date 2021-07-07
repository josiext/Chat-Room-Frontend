import styles from "./Title.module.css";

interface TitleProps {
  subtitle: string;
}

export default function Title({ subtitle }: TitleProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat Room</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </div>
  );
}
