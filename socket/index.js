const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user?.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket?.id);
    io.emit("getUsers", users);
  });

  //   send and receive messages
  socket.on("sendMessage", (data) => {
    // console.log(data);
    const user = getUser(data?.receiverId);
    // console.log(users);
    // console.log(user);
    io.to(user?.socketId).emit("getMessage", {
      senderId: data?.senderId,
      text: data?.text,
    });
  });

  //   when disconnect
  socket.on("disconnect", () => {
    console.log("someone disconnected");
    removeUser(socket?.id);
    io.emit("getUsers", users);
  });
});
