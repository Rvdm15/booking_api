import { PrismaClient } from "@prisma/client";

// Verwijdert een booking. Geeft id of null terug (als booking niet bestaat)
const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.booking.deleteMany({
    where: { id },
  });
  return result.count > 0 ? id : null;
};

export default deleteBookingById;
