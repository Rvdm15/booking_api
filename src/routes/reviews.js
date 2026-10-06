import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// Alle reviews ophalen
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// Eén review ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe review toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// Review wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await updateReviewById(req.params.id, req.body);
    if (!id) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json({ message: "Review updated" });
    }
  } catch (error) {
    next(error);
  }
});

// Review verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deleteReviewById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "Review not found",
      });
    } else {
      res.status(200).json({ message: "Review deleted" });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
