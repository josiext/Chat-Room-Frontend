import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import debounce from "just-debounce-it";

import Chat, { MessagesData } from "../components/chat";
import UserForm, { UserFormData } from "../components/userForm";
import { ChatService } from "../services";
import styles from "../styles/Home.module.css";

export default function Home(): JSX.Element {
  const [messages, setMessages] = useState<MessagesData[]>([]);
  const [error, setError] = useState<string>("");
  const [chatInfo, setChatInfo] = useState<string>("");

  const handleChatInfo = (msg: string, time = 1000) => {
    setChatInfo(msg);
    debounce(() => {
      console.log("lipieaza");
      setChatInfo("");
    }, time)();
  };

  const cleanInfoMsg = useCallback(
    debounce(() => {
      setChatInfo("");
    }, 1000),
    [setChatInfo]
  );

  useEffect(() => {
    ChatService.onMessage((msg) =>
      setMessages((prev) => [...(prev as any), msg])
    );
    ChatService.onUserConnected((user) =>
      handleChatInfo(`${user} has connected`, 3000)
    );
    ChatService.onWritting((user) => {
      setChatInfo(`${user} is typing...`);
      cleanInfoMsg();
    });
  }, [cleanInfoMsg]);

  const sendMsg = (msg: string) => {
    try {
      ChatService.sendMessage(msg);
      setError("");
    } catch (e) {
      console.error(e);
      setError("An error has occurred");
    }
  };

  const handleInputMsg = () => {
    try {
      ChatService.setWritting();
      setError("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleUserForm = (form: UserFormData) => {
    ChatService.setUsername(form.username);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Public Chat</title>
        <meta name="description" content="Public Chat with Socket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UserForm onSubmit={handleUserForm} />
        <div className={styles.container__chat}>
          <h1>Public Chat</h1>
          <Chat
            className={styles.container_chat_messages}
            messages={messages}
            error={error}
            onSubmit={sendMsg}
            onWriteMsg={handleInputMsg}
            info={chatInfo}
          />
        </div>
      </main>
    </div>
  );
}
