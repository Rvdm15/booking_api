import { PrismaClient } from "@prisma/client";

// Verwijdert een property. Geeft id of null terug (als property niet bestaat)
const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.property.deleteMany({
    where: { id },
  });
  return result.count > 0 ? id : null;
};

export default deletePropertyById;
