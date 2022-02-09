import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRoadmap = async () => {
  const roadmaps = await prisma.roadmap.findMany();

  const courses = await prisma.course.findMany();

  return roadmaps.map((item) => {
    const matchCourses = courses.filter((course) => course.level === item.level);
    return { ...item, courses: matchCourses };
  });
};
