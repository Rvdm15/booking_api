import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// Alle users ophalen
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Eén user ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe user toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;

    // Controle: ontbreekt er een verplicht veld? Dan 400
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      pictureUrl
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// User wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await updateUserById(req.params.id, req.body);
    if (!id) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User updated" });
    }
  } catch (error) {
    next(error);
  }
});

// User verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deleteUserById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
