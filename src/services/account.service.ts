import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { getUserCourses } from "./course.service";
import { generateSignature, getResourse } from "./cloudinary.service";
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

  const courses = await getUserCourses(user.id);

  const data = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    plan: user.plan,
    level: user.level,
    courses,
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

  const courses = await getUserCourses(userInfo.id);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    plan: user.plan,
    level: user.level,
    courses,
  };
};

export const updateProfile = async (id: string, { name }: { name: string }) => {
  if (!name || !name.trim()) throw new Error(Errors.Account.NameIsEmpty);
  await prisma.user.update({
    where: { id },
    data: { name },
  });
};

export const updateAvatar = async (id: string, { avatarPublicId }: { avatarPublicId: string }) => {
  if (!avatarPublicId || !avatarPublicId.trim()) throw new Error(Errors.BadRequest);

  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw new Error(Errors.BadCredential);

  const newAvatar = await getResourse(avatarPublicId);
  if (newAvatar) {
    const { url: avatar } = newAvatar;

    await prisma.user.update({
      where: { id },
      data: { avatar, avatarPublicId },
    });
  }
};

export const changePassword = async (
  id: string,
  { password, newPassword }: { password: string; newPassword: string }
) => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw new Error(Errors.BadCredential);

  const passed = await bcrypt.compare(password, user.password);
  if (!passed) throw new Error(Errors.BadCredential);

  const isValidNewPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(newPassword);
  if (!isValidNewPassword) throw new Error(Errors.Account.NewPasswordInvalid);

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id },
    data: { password: newHashedPassword },
  });
};

export const search = async (id: string, searchString: string) => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw new Error(Errors.BadCredential);

  const userCourses = await getUserCourses(id);
  const courseIds = userCourses.map((item) => item.courseId);
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds }, name: { contains: searchString.trim(), mode: "insensitive" } },
  });
  const lessons = await prisma.lesson.findMany({
    where: { courseId: { in: courseIds }, nameEn: { contains: searchString.trim(), mode: "insensitive" } },
    include: { course: true },
  });

  return {
    courses: courses.map((item) => ({ id: item.id, name: item.name })),
    lessons: lessons.map((item) => ({
      id: item.id,
      nameEn: item.nameEn,
      nameVi: item.nameVi,
      courseId: item.courseId,
      courseName: item.course.name,
    })),
  };
};

export const generateUpdateAvatarSignature = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw new Error(Errors.BadCredential);

  const signData: any = {
    eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
  };

  if (user.avatarPublicId) {
    signData.public_id = user.avatarPublicId;
  } else {
    signData.folder = "avatars";
  }

  const signedData = generateSignature(signData);
  return signedData;
};
