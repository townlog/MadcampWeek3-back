import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.listen(5000, () => {
  console.log(`Server is on http://localhost:5000`);
});
