import { PrismaClient } from "@prisma/client";

// Haalt alle hosts op, zonder wachtwoord
const getHosts = async () => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    omit: { password: true },
  });
  return hosts;
};

export default getHosts;
