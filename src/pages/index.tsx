import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import debounce from "just-debounce-it";

import Chat, { MessagesData } from "../components/chat";
import Modal from "../components/modal";
import UserForm, { UserFormData } from "../components/userForm";
import { ChatService } from "../services";
import styles from "../styles/Home.module.css";

export default function Home(): JSX.Element {
  const [messages, setMessages] = useState<MessagesData[]>([]);
  const [error, setError] = useState<string>("");
  const [modalSignIn, setModalSignIn] = useState(false);
  const [chatInfo, setChatInfo] = useState<string>("");

  const cleanInfoMsg = useCallback(
    debounce(() => {
      setChatInfo("");
    }, 1000),
    [setChatInfo]
  );

  useEffect(() => {
    ChatService.onWritting((user) => {
      setChatInfo(`${user} is typing...`);
      cleanInfoMsg();
    });
  }, [cleanInfoMsg]);

  useEffect(() => {
    ChatService.onMessage((msg) => setMessages((prev) => [...prev, msg]));
    ChatService.onUserConnected((user) =>
      handleChatInfo(`${user} has connected`, 3000)
    );
  }, []);

  const handleChatInfo = (msg: string, time = 1000) => {
    setChatInfo(msg);
    debounce(() => {
      console.log("lipieaza");
      setChatInfo("");
    }, time)();
  };

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
    setModalSignIn(false);
  };

  const handleCloseSignIn = () => {
    setModalSignIn(false);
  };

  return (
    <>
      <Head>
        <title>Public Chat</title>
        <meta name="description" content="Public Chat with Socket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={styles.container}>
        <h1>Chat Room</h1>

        <div className={styles.container__chat}>
          <Chat
            className={styles.container_chat_messages}
            messages={messages}
            error={error}
            onSubmit={sendMsg}
            onWriteMsg={handleInputMsg}
            info={chatInfo}
          />
        </div>
        <button onClick={() => setModalSignIn(true)}>Login</button>
        <button onClick={() => setModalSignIn(true)}>Logout</button>
      </main>

      <Modal open={modalSignIn} onClose={handleCloseSignIn}>
        <div>
          <UserForm onSubmit={handleUserForm} />
        </div>
      </Modal>
    </>
  );
}
