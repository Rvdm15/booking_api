import { PrismaClient } from "@prisma/client";

// Haalt één property op via het id, zonder wachtwoord
const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: { id },
  });
  return property;
};
export default getPropertyById;
