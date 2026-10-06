import { PrismaClient } from "@prisma/client";

// Wijzigt een review. Geeft id of null terug (als ie niet bestaat)
const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const result = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });
  return result.count > 0 ? id : null;
};
export default updateReviewById;
