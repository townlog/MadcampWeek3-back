import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./routes/users.js";
import friendRouter from "./routes/friends.js";
import furnitureRouter from "./routes/furnitures.js";
import todoRouter from "./routes/todos.js";
import chatRouter from "./routes/chat.js";
import { issueJWT } from "./utils/users.js";
import { createServer } from "http";
import { isChamyeoRoom, sendMessage } from "./utils/chat.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("join", ({ user, roomId }) => {
    console.log("initjoin");
    if (user?.id === undefined || roomId === undefined) {
      return;
    }

    socket.join(roomId);
  });

  socket.on("send", ({ user, roomId, payload }) => {
    socket.broadcast
      .to(roomId)
      .emit("receive", { user, payload, createdAt: Date.now().toString() });
    sendMessage({ userId: user.id, roomId, payload });
  });
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/users", userRouter);
app.use("/friends", friendRouter);
app.use("/furnitures", furnitureRouter);
app.use("/todos", todoRouter);
app.use("/chat", chatRouter);

app.post("", async (req, res) => {
  const { id, password } = req.body;
  console.log(`id, password`, id, password);
  const { token } = issueJWT(1);
  if (id === "test" && password === "password") {
    console.log("Success");
    return res.json({ status: true, token });
  }
  res.json({ status: false });
});

httpServer.listen(5000, () => {
  console.log(`Server is on http://localhost:5000`);
});
