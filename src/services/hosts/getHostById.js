import { PrismaClient } from "@prisma/client";

// Haalt één host op via het id, zonder wachtwoord
const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: { id },
    omit: { password: true },
  });
  return host;
};
export default getHostById;
