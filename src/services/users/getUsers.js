import { PrismaClient } from "@prisma/client";

// Haalt alle users op, zonder wachtwoord
const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: { username, email },
    omit: { password: true },
  });
  return users;
};

export default getUsers;
