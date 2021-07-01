import socketIOClient from "socket.io-client";
import { END_POINTS } from "../configs";

console.log("ejecutado");
const socket = socketIOClient(END_POINTS.CHAT);

export const lisentMessage = (cb: (a: string) => unknown) => {
  socket.on("chat message", (data: string) => {
    cb && cb(data);
  });
};

export const sendMessage = (msg: string) => {
  if (typeof msg !== "string") throw new Error("Message have to be a text");
  if (msg.trim() === "") throw new Error("Invalid message");

  socket.emit("chat message", msg.trim());

  return msg;
};

export const setUsername = (user: string) => {
  if (typeof user !== "string") throw new Error("Username have to be a text");
  if (user.trim() === "") throw new Error("Invalid username");

  socket.emit("set username", user.trim());

  return user;
};
