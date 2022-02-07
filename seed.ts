import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();

  try {
    console.log("Start init data");
    console.log("Init users...");
    const users = await prisma.user.findMany();
    if (!users.length) {
      const password = await bcrypt.hash("Asdfgh1@3", 10);
      await prisma.user.createMany({
        data: [
          { email: "hungdev.js@gmail.com", name: "Nguyen Viet Hung Admin", password, role: "ADMIN" },
          { email: "hungdev.js+1@gmail.com", name: "Nguyen Viet Hung User", password },
        ],
      });
    }
    console.log("Init users successfully");

    console.log("Init data successfully");
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
};

export default seed;
