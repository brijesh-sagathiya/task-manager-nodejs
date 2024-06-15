const { Server } = require("socket.io");

let io;

// Function to initialize socket.io server
function init(server) {
  // Create a new socket.io server instance
  io = new Server(server, {
    cors: {
      origin: "*", // Allowing all origins for CORS
    },
  });

  // Event handler for new connection
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Event handler for disconnection
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
}

// Function to get the initialized socket.io instance
function getIO() {
  if (!io) {
    // Throw an error if socket.io is not initialized
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  init,
  getIO,
};
