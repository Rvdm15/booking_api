import { PrismaClient } from "@prisma/client";

// Verwijdert een user. Geeft id of null terug (als user niet bestaat)

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.user.deleteMany({
    where: { id },
  });
  return result.count > 0 ? id : null;
};

export default deleteUserById;
