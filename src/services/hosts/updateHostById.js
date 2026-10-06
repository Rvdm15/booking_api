import { PrismaClient } from "@prisma/client";

// Wijzigt een host. Geeft id of null terug (als ie niet bestaat)
const updateHostById = async (id, updatedHost) => {
  const prisma = new PrismaClient();

  const result = await prisma.host.updateMany({
    where: { id },
    data: updatedHost,
  });
  return result.count > 0 ? id : null;
};
export default updateHostById;
