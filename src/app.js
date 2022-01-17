import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./routes/users.js";
import friendRouter from "./routes/friends.js";
import furnitureRouter from "./routes/furnitures.js";
import { issueJWT } from "./utils/users.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("roomjoin", (userid) => {
    console.log(userid);
    socket.join(userid);
  });
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/users", userRouter);
app.use("/friends", friendRouter);
app.use("/furnitures", furnitureRouter);

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
