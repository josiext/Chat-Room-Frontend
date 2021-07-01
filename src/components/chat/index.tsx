import { useState, useEffect, useRef } from "react";

import styles from "../../styles/Chat.module.css";

export default function Chat({
  messages = [],
  onSubmit = () => undefined,
  error = "",
  className = "",
  onWriteMsg = () => undefined,
}: any) {
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
    onSubmit({ msg: newMsg });
    setNewMsg("");
  };

  return (
    <div className={styles.container + " " + className}>
      <div className={styles.container__messages} ref={refContainerMsg}>
        {messages.map(({ msg, user }: any, idx: number) => (
          <div
            key={idx}
            className={
              styles.container__messages__msg +
              " " +
              (idx % 2 ? "" : styles.container__messages__msg_dark)
            }
          >
            <span>
              <b>{user}:</b>
            </span>
            <span>{" " + msg}</span>
          </div>
        ))}
      </div>

      <form className={styles.container__form} onSubmit={handleSubmit}>
        <input
          className={styles.container__form__input}
          value={newMsg}
          onChange={handleMsg}
          placeholder="message..."
          maxLength={50}
        />
        <button type="submit">Send</button>
        <small>{error}</small>
      </form>
    </div>
  );
}
