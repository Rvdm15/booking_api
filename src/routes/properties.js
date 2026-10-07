import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// Alle properties ophalen
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;
    const properties = await getProperties(location, pricePerNight);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

// Eén property ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe property toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    // Controle: ontbreekt er een verplicht veld? Dan 400
    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId ||
      !rating
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    );

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

// Property wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await updatePropertyById(req.params.id, req.body);
    if (!id) {
      res.status(404).json({ message: "Property not found" });
    } else {
      res.status(200).json({ message: "Property updated" });
    }
  } catch (error) {
    next(error);
  }
});

// Property verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deletePropertyById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "Property not found",
      });
    } else {
      res.status(200).json({ message: "Property deleted" });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
