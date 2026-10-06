import { PrismaClient } from "@prisma/client";

// Verwijdert een review. Geeft id of null terug (als review niet bestaat)
const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.review.deleteMany({
    where: { id },
  });
  return result.count > 0 ? id : null;
};

export default deleteReviewById;
