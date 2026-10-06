import express from "express";
import usersRouter from "./routes/users.js";

const app = express();

// Zorgt dat Express Json uit request kan lezen (req.body)
app.use(express.json());

// Routes
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
