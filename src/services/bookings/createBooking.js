import { PrismaClient } from "@prisma/client";

// Maakt een nieuwe booking aan in database
const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
) => {
  const prisma = new PrismaClient();

  const newBooking = await prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
  return newBooking;
};

export default createBooking;
