import socketIOClient from "socket.io-client";
import { END_POINTS } from "../configs";

export interface Message {
  user: string;
  content: string;
}

const socket = socketIOClient(END_POINTS.CHAT);

export const onUserConnected = (cb: (u: string) => unknown): void => {
  socket.on("user connected", (data: string) => {
    cb && cb(data);
  });
};

export const onMessage = (cb: (a: Message) => unknown): void => {
  socket.on("chat message", (data: Message) => {
    cb && cb(data);
  });
};

export const onWritting = (cb: (a: string) => unknown): void => {
  socket.on("writting", (data: string) => {
    cb && cb(data);
  });
};

export const setWritting = (): void => {
  socket.emit("writting");
};

export const sendMessage = (msg: string): string => {
  if (typeof msg !== "string") throw new Error("Message have to be a text");
  if (msg.trim() === "") throw new Error("Invalid message");

  socket.emit("chat message", msg.trim());

  return msg;
};

export const setUsername = (user: string): string => {
  if (typeof user !== "string") throw new Error("Username have to be a text");
  if (user.trim() === "") throw new Error("Invalid username");

  socket.emit("set username", user.trim());

  return user;
};
