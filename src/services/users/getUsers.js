import { PrismaClient } from "@prisma/client";

// Haalt alle users op, zonder wachtwoord
const getUsers = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    omit: { password: true },
  });
  return users;
};

export default getUsers;
