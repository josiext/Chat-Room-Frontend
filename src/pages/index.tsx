import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Head from "next/head";

import Chat from "../components/chat";
import { END_POINTS } from "../configs";

const socket = socketIOClient(END_POINTS.CHAT);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("chat message", (data: string) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMsg = (msg: string) => {
    if (msg.trim() !== "") socket.emit("chat message", msg);
  };

  return (
    <div>
      <Head>
        <title>Public Chat</title>
        <meta name="description" content="Public Chat with Socket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Public Chat</h1>
        <Chat messages={messages} onSubmit={(f: any) => sendMsg(f.msg)} />
      </main>
    </div>
  );
}
