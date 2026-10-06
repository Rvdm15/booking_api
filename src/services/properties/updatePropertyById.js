import { PrismaClient } from "@prisma/client";

// Wijzigt een property. Geeft id of null terug (als ie niet bestaat)
const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const result = await prisma.property.updateMany({
    where: { id },
    data: updatedProperty,
  });
  return result.count > 0 ? id : null;
};
export default updatePropertyById;
