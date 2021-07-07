import styles from "./Input.module.css";

export default function Input({
  className = "",
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>): JSX.Element {
  return <input className={`${styles.input} ${className}`} {...props} />;
}
