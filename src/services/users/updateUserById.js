import { PrismaClient } from "@prisma/client";

// Wijzigt een user. Geeft id of null terug (als ie niet bestaat)
const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();

  const result = await prisma.user.updateMany({
    where: { id },
    data: updatedUser,
  });
  return result.count > 0 ? id : null;
};
export default updateUserById;
