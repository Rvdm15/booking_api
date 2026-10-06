// Prisma Client: praten met database
import { PrismaClient } from "@prisma/client";

// Json-data uit opdracht
import userData from "../src/data/users.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };
import bookingData from "../src/data/bookings.json" with { type: "json" };
import reviewData from "../src/data/reviews.json" with { type: "json" };
import amenityData from "../src/data/amenities.json" with { type: "json" };

// Verbinding maken met database
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

// De lijsten uit Json-bestanden halen

const { users } = userData;
const { hosts } = hostData;
const { properties } = propertyData;
const { bookings } = bookingData;
const { reviews } = reviewData;
const { amenities } = amenityData;

// Hoofdfunctie: vult database met JSON data
async function main() {
  // Users toevoegen
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Host toevoegen
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Amenities toevoegen
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Properties toevoegen
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  // Bookings toevoegen
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  // Reviews toevoegen
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

// 1. Seed uitvoeren en 2. de verbinding sluiten
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
