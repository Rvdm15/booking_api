import { PrismaClient } from "@prisma/client";

// Haalt één review op via het id
const getReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({
    where: { id },
  });
  return review;
};
export default getReviewById;
