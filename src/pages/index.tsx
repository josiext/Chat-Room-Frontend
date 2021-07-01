import { useEffect, useState } from "react";
import Head from "next/head";

import Chat from "../components/chat";
import { ChatService } from "../services";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    ChatService.lisentMessage((msg) => setMessages((prev) => [...prev, msg]));
  }, []);

  const sendMsg = (msg: string) => {
    try {
      ChatService.setUsername("Juan");
      ChatService.sendMessage(msg);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleInputMsg = () => {
    setError("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Public Chat</title>
        <meta name="description" content="Public Chat with Socket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container__chat}>
          <h1>Public Chat</h1>
          <Chat
            className={styles.container_chat_messages}
            messages={messages}
            error={error}
            onSubmit={(f: any) => sendMsg(f.msg)}
            onWriteMsg={handleInputMsg}
          />
        </div>
      </main>
    </div>
  );
}
