import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async () => {
  const courses = await prisma.course.findMany();
  const lessons = await prisma.lesson.findMany();
  return courses.map((course) => {
    const numberOfLessons = lessons.filter((lesson) => lesson.courseId === course.id).length;
    return { ...course, numberOfLessons };
  });
};

export const getById = async (id: string) => {
  const course = await prisma.course.findFirst({ where: { id }, include: { lessons: true } });
  return course;
};
