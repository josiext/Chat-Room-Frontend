const io = require("socket.io")();

const DEFAULT_USERNAME = "anonymous";

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.username = DEFAULT_USERNAME;
  socket.broadcast.emit("user connected", socket.username);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on("chat message", (content) => {
    console.log(socket.username);

    const data = { content, user: socket.username };

    io.emit("chat message", data);
  });

  socket.on("set username", (username) => {
    socket.username = username;
  });

  socket.on("user connected", (user) => {
    io.emit("user connected", user);
  });

  socket.on("error", (err) => {
    console.log("error ", err.message);
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });

  socket.on("writting", () => {
    socket.broadcast.emit("writting", socket.username);
  });
});

io.listen(4001, {
  cors: {
    origin: "http://localhost:3000",
  },
});
