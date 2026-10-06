import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// Alle hosts ophalen
router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

// Eén host ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) {
      res.status(404).json({ message: "Host not found" });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe host toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    );

    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

// Host wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await updateHostById(req.params.id, req.body);
    if (!id) {
      res.status(404).json({ message: "Host not found" });
    } else {
      res.status(200).json({ message: "Host updated" });
    }
  } catch (error) {
    next(error);
  }
});

// Host verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deleteHostById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "Host not found",
      });
    } else {
      res.status(200).json({ message: "Host deleted" });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
