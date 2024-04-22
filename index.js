const http = require("http");
const server = http.createServer();
const port = 3001;

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    socket.on("newConnected", (data) => {
        socket.broadcast.emit("newConnected", data.message);
    });

    socket.on("send_message", (data) => {
        io.emit("send_message", data);
    });
});

server.listen(port);
