import { PrismaClient } from "@prisma/client";

// Verwijdert een host. Geeft id of null terug (als host niet bestaat)
const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.host.deleteMany({
    where: { id },
  });
  return result.count > 0 ? id : null;
};

export default deleteHostById;
