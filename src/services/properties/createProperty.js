import { PrismaClient } from "@prisma/client";

// Maakt een nieuwe property aan in database
const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
) => {
  const prisma = new PrismaClient();

  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });
  return newProperty;
};

export default createProperty;
