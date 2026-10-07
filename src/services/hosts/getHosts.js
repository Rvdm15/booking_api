import { PrismaClient } from "@prisma/client";

// Haalt alle hosts op ( of alleen op naam) , zonder wachtwoord
const getHosts = async (name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: { name },
    omit: { password: true },
  });
  return hosts;
};

export default getHosts;
