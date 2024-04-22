const http = require("http");

const server = http.createServer();
const port = process.env.PORT || 3001;

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    socket.on("newConnected", (data) => {
        socket.broadcast.emit("newConnected", data);
    });

    socket.on("send_message", (data) => {
        io.emit("send_message", data);
    });
});

server.listen(port);
