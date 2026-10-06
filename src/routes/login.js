import express from "express";
import jwt from "jsonwebtoken";
import getUserByCredentials from "../services/users/getUserByCredentials.js";

const router = express.Router();

// Inloggen en een token teruggeven
router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByCredentials(username, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET_KEY);
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
