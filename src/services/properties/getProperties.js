import { PrismaClient } from "@prisma/client";

// Haalt alle properties op (of gefilterd op location en/of pricePerNight)

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location,
      pricePerNight: pricePerNight ? Number(pricePerNight) : undefined,
    },
  });
  return properties;
};
export default getProperties;
