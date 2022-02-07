import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import Errors from "../utils/Errors";

const prisma = new PrismaClient();

export const logIn = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw Errors.BadCredential;

  const passed = await bcrypt.compare(password, user.password);
  if (!passed) throw Errors.BadCredential;

  const data = {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    level: user.level,
  };

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
  });

  return { data, accessToken };
};
