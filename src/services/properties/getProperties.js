import { PrismaClient } from "@prisma/client";

// Haalt alle properties op, zonder wachtwoord
const getProperties = async () => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({});
  return properties;
};

export default getProperties;
