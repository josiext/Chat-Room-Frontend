import styles from "../../styles/Modal.module.css";

interface ModalProps {
  open: boolean;
  children: JSX.Element;
  onClose: () => unknown;
}

export default function Modal({
  open = false,
  children,
  onClose = () => undefined,
}: ModalProps): JSX.Element {
  if (!open) return <></>;

  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles["modal-content"]}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className="content"></div>
        {children}
      </div>
    </div>
  );
}
