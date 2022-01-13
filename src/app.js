import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/users.js";
import friendRouter from "./routes/friends.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/users", userRouter);
app.use("/friends", friendRouter);

app.listen(5000, () => {
  console.log(`Server is on http://localhost:5000`);
});
