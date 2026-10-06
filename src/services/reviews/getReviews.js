import { PrismaClient } from "@prisma/client";

// Haalt alle reviews op
const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({});
  return reviews;
};

export default getReviews;
