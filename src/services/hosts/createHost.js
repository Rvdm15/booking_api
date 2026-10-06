import { PrismaClient } from "@prisma/client";

// Maakt een nieuwe host aan in database
const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe,
) => {
  const prisma = new PrismaClient();

  const newHost = await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
    omit: { password: true },
  });
  return newHost;
};

export default createHost;
