const { lutimes } = require("fs/promises");
const http = require("http");

const server = http.createServer();
const port = process.env.PORT || 3001;

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

let usersConnected = [];

io.on("connection", (socket) => {
    socket.on("user_connected", (data) => {
        usersConnected.push({ user: data.user, email: data.email });
        io.emit("user_connected", usersConnected);
    });

    socket.on("user_disconnected", (data) => {
        usersConnected = usersConnected.filter((user) => user.email !== data.email);
        io.emit("user_disconnected", usersConnected);
    });

    socket.on("newConnected", (data) => {
        socket.broadcast.emit("newConnected", data);
    });

    socket.on("send_message", (data) => {
        io.emit("send_message", data);
    });
});

server.listen(port);
