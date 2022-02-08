import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import Errors from "../utils/Errors";
import environment from "../utils/environment";

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

  const accessToken = jwt.sign(data, environment.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: environment.JWT_ACCESS_TOKEN_LIFE,
  });

  return { data, accessToken };
};

export const getInfo = async (token: string) => {
  jwt.verify(token, environment.JWT_ACCESS_TOKEN_SECRET_KEY);
  //@ts-ignore
  const userInfo = jwt.decode(token, environment.JWT_ACCESS_TOKEN_SECRET_KEY);

  const user = await prisma.user.findUnique({
    where: {
      id: userInfo.id,
    },
  });
  if (!user) throw new Error(Errors.BadCredential);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    level: user.level,
  };
};
