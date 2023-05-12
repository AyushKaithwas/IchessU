const express = require("express");
const { Server } = require("ws");
const http = require("http");

const app = express();

// Set up a simple Express server
const server = http.createServer(app);

// Create a WebSocket server instance
const wss = new Server({ server });

// Store all rooms
let rooms = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Parse the message as JSON
    const data = JSON.parse(message);

    switch (data.type) {
      case "create":
        // Create a new room
        if (!rooms[data.code]) {
          rooms[data.code] = new Set();
          rooms[data.code].add(ws);
          console.log("Room created: " + data.code);
        }

        // Store the room on the socket for future use
        ws.room = data.room;
        break;

      case "join":
        // Join an existing room
        if (rooms[data.code] && rooms[data.code].size < 2) {
          rooms[data.code].add(ws);
          console.log("Room joined: " + data.code);
          console.log("No. of clients: " + rooms[data.code].size);

          // Send a response back to the client
          for (let client of rooms[data.code]) {
            if (client !== ws && client.readyState === ws.OPEN) {
              client.send(
                JSON.stringify({
                  type: "joined",
                  success: true,
                })
              );
              console.log("Friend joined: ");
            }
          }

          ws.send(
            JSON.stringify({
              type: "join",
              success: true,
            })
          );
        } else {
          if (rooms[data.code] && rooms[data.code].size >= 2) {
            console.log("Room full: " + data.code);
          } else {
            console.log("Room not found: " + data.code);
          }
          ws.send(
            JSON.stringify({
              type: "join",
              success: false,
            })
          );
        }
        break;
      case "message":
        // Send the message to everyone in the room
        for (let client of rooms[ws.code]) {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(data.message);
            console.log("Message sent: " + data.message);
          }
        }
        break;
    }
  });

  ws.on("close", () => {
    // Remove the client from the room
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room].delete(ws);
    }
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
