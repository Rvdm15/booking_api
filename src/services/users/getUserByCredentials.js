import { PrismaClient } from "@prisma/client";

// Zoekt een user met deze username en dit wachtwoord (login)

const getUserByCredentials = async (username, password) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: { username, password },
  });
  return user;
};

export default getUserByCredentials;
