import { PrismaClient } from "@prisma/client";

// Maakt een nieuwe user aan in database
const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  const prisma = new PrismaClient();

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
    omit: { password: true },
  });
  return newUser;
};

export default createUser;
