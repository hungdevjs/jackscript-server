import { PrismaClient } from "@prisma/client";
import sample from "lodash/sample";

const prisma = new PrismaClient();

export const get = async () => {
  const tips = await prisma.tip.findMany();

  return sample(tips);
};
