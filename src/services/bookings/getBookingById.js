import { PrismaClient } from "@prisma/client";

// Haalt één booking op via het id
const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });
  return booking;
};
export default getBookingById;
