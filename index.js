const http = require("http");

//!--
const { conn } = require("./db");
const { Message } = require("./db");
//!--

const server = http.createServer();
const port = process.env.PORT || 3001;

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    socket.on("newConnected", async (data) => {
        socket.broadcast.emit("newConnected", data.message);
        const findAllMessages = await Message.findAll();
        socket.to(data.user).emit("newConnected", findAllMessages);
    });

    socket.on("send_message", (data) => {
        io.emit("send_message", data);
    });

    socket.on("disconected", (data) => {
        data.forEach(async (msg) => {
            const user = msg.user;
            const message = msg.message;
            return await Message.create({ user: user, message: message });
        });
        // const updateMessages = await Message.create(data.forEach(msg => {
        //     return {user}
        // }))
    });
});

//* server.listen(port);

conn.sync({ force: true })
    .then(() => {
        server.listen(port, () => {
            console.log("Server listen on port 3001");
        });
    })
    .catch((error) => console.error(error));
