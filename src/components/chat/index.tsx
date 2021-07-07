import { useState, useEffect, useRef } from "react";

import Input from "../input";
import styles from "./Chat.module.css";

export interface MessagesData {
  user: string;
  content: string;
}
export interface ChatProps {
  messages: MessagesData[];
  onSubmit: (msg: string) => unknown;
  error?: string;
  className?: string;
  onWriteMsg?: (s: string) => unknown;
  info?: string;
}

export default function Chat({
  messages = [],
  onSubmit = () => undefined,
  error = "",
  className = "",
  onWriteMsg = () => undefined,
  info = "",
}: ChatProps): JSX.Element {
  const [newMsg, setNewMsg] = useState<string>("");
  const refContainerMsg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    refContainerMsg?.current?.scrollTo({
      top: refContainerMsg?.current?.scrollHeight,
    });
  }, [messages]);

  const handleMsg = (e: any) => {
    const value = e.target.value;
    onWriteMsg(value);
    setNewMsg(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(newMsg);
    setNewMsg("");
  };

  return (
    <div className={styles.container + " " + className}>
      <div className={styles.container__messages} ref={refContainerMsg}>
        {messages.map(({ content, user = "Anonymous" }, idx: number) => (
          <div
            key={idx}
            className={`${styles.container__messages__msg} ${
              idx % 2 ? "" : styles.container__messages__msg_dark
            }`}
          >
            <span className={`${styles.msg} ${styles.msg_author}`}>
              {user}:
            </span>
            <span className={`${styles.msg} ${styles.msg_content}`}>
              {" " + content}
            </span>
          </div>
        ))}
      </div>

      <small>{info}</small>

      <form className={styles.container__form} onSubmit={handleSubmit}>
        <div className={styles.form_input_button}>
          <Input
            className={styles.container__form__input}
            value={newMsg}
            onChange={handleMsg}
            placeholder="message..."
            maxLength={100}
          />

          <button type="submit" className={styles.send_msg_btn}>
            Send
          </button>
        </div>
        <div className={styles.error_container}>
          <small className={styles.error_message}>{error}</small>
        </div>
      </form>
    </div>
  );
}
