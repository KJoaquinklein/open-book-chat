const http = require("http");

const server = http.createServer();
const port = process.env.PORT || 3001;

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

const usersConnected = [];

io.on("connection", (socket) => {
    socket.on("user_connected", (data) => {
        usersConnected.push(data.user);
        io.emit("user_connected", usersConnected);
    });

    socket.on("user_disconnected", (data) => {
        usersConnected.filter((user) => user !== data.user);
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
