import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/users.js";
import friendRouter from "./routes/friends.js";
import furnitureRouter from "./routes/furnitures.js";
import { issueJWT } from "./utils/users.js";

const app = express();

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

app.listen(5000, () => {
  console.log(`Server is on http://localhost:5000`);
});
