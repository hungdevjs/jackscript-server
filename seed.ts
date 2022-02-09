import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tipImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644311731/tips/Emi-ZnAVkAEqtVq_esdtmh.jpg";
const tipTitleEn = "Object methods";
const tipTitleVi = "Object methods";
const tipBodyEn = "Understand object methods better";
const tipBodyVi = "Hiểu hơn về object methods";

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

    console.log("Init tips...");
    const tips = await prisma.tip.findMany();
    if (!tips.length) {
      await prisma.tip.create({
        data: {
          image: tipImage,
          titleEn: tipTitleEn,
          titleVi: tipTitleVi,
          bodyEn: tipBodyEn,
          bodyVi: tipBodyVi,
        },
      });
    }
    console.log("Init tips successfully");

    console.log("Init data successfully");
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
};

export default seed;
