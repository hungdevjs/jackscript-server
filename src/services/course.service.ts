import { PrismaClient } from "@prisma/client";

import Errors from "../utils/Errors";
import { UserLevels } from "../utils/constants";

const prisma = new PrismaClient();

export const get = async () => {
  const courses = await prisma.course.findMany();
  const lessons = await prisma.lesson.findMany();
  return courses.map((course) => {
    const numberOfLessons = lessons.filter((lesson) => lesson.courseId === course.id).length;
    return { ...course, numberOfLessons };
  });
};

export const getById = async (userId: string, courseId: string) => {
  const userCourse = await prisma.userCourse.findFirst({ where: { userId, courseId } });
  if (!userCourse) throw new Error(Errors.Course.NotJoin);
  const course = await prisma.course.findFirst({ where: { id: courseId }, include: { lessons: true } });
  const { id, name, descriptionEn, descriptionVi, level, image, lessons } = course;
  return {
    id,
    name,
    descriptionEn,
    descriptionVi,
    level,
    image,
    lessons: lessons
      .map((lesson) => ({ id: lesson.id, nameEn: lesson.nameEn, nameVi: lesson.nameVi, order: lesson.order }))
      .sort((lesson1, lesson2) => lesson1.order - lesson2.order),
  };
};

export const start = async (userId: string, courseId: string) => {
  const userCourse = await prisma.userCourse.findFirst({ where: { userId, courseId } });
  if (userCourse) return userCourse;

  const user = await prisma.user.findFirst({ where: { id: userId } });
  const course = await prisma.course.findFirst({ where: { id: courseId } });
  if (UserLevels.indexOf(user.level) < UserLevels.indexOf(course.level)) throw new Error(Errors.Course.LowLevel);

  const newUserCourse = await prisma.userCourse.create({
    data: { userId, courseId },
  });

  return newUserCourse;
};

export const getLesson = async (userId: string, lessonId: string) => {
  const lesson = await prisma.lesson.findFirst({ where: { id: lessonId } });
  if (!lesson) throw new Error(Errors.BadRequest);

  const userCourse = await prisma.userCourse.findFirst({
    where: { userId, courseId: lesson.courseId },
    include: { course: true },
  });
  if (!userCourse) throw new Error(Errors.Course.NotJoin);

  return { ...lesson, courseName: userCourse.course.name };
};
