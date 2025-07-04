// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config({path:'../process.env'});

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://sportsfiesta-kkwa.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: "https://sportsfiesta-kkwa.onrender.com",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const teamRoutes = require("./routes/teams");
const scoreRoutes = require("./routes/scores");
const path = require("path");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/scores", scoreRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.route('/',(req,res) =>{
  return 'Hello Harshika'
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
