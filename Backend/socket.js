const Message = require("./models/Message");
let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join personal room
    socket.on("join", (userId) => {
      if (!userId) return;
      socket.join(userId.toString());
      console.log(`User ${userId} joined room`);
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      if (!sender || !receiver || !message) {
        console.warn("Invalid message data:", { sender, receiver, message });
        return;
      }

      try {
        // Save message to DB
        const newMessage = await Message.create({ sender, receiver, message });

        // Populate sender and receiver fields
        await newMessage.populate([
          { path: "sender", select: "name role" },
          { path: "receiver", select: "name role" },
        ]);

        // Emit message to sender and receiver rooms
        io.to(sender.toString()).emit("receiveMessage", newMessage);
        io.to(receiver.toString()).emit("receiveMessage", newMessage);

        console.log(
          `Message from ${sender} to ${receiver} emitted successfully`
        );
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocket;
