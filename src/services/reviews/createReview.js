import { PrismaClient } from "@prisma/client";

// Maakt een nieuwe review aan in database
const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const newReview = await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
  return newReview;
};

export default createReview;
