import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async () => {
  const faqs = await prisma.faq.findMany();

  return faqs;
};
