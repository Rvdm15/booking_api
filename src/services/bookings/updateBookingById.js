import { PrismaClient } from "@prisma/client";

// Wijzigt een booking. Geeft id of null terug (als ie niet bestaat)
const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  const result = await prisma.booking.updateMany({
    where: { id },
    data: updatedBooking,
  });
  return result.count > 0 ? id : null;
};
export default updateBookingById;
