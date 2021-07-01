const io = require("socket.io")();

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on("chat message", (msg) => {
    console.log(socket.username);

    const data = { msg, user: socket.username };

    io.emit("chat message", data);
  });

  socket.on("set username", (username) => {
    socket.username = username;
  });

  socket.on("error", (err) => {
    console.log("error ", err.message);
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});

io.listen(4001, {
  cors: {
    origin: "http://localhost:3000",
  },
});
