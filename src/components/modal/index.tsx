import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  children: JSX.Element;
  onClose: () => unknown;
}

export default function Modal({
  open = false,
  onClose = () => undefined,
  children,
}: ModalProps): JSX.Element {
  if (!open) return <></>;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.container_close_btn}>
          <button className={styles.close_btn} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.children_content}>{children}</div>
      </div>
    </div>
  );
}
