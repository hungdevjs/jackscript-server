import bcrypt from "bcrypt";
import { PrismaClient, UserLevel } from "@prisma/client";

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

    console.log("Init tips...");
    const tips = await prisma.tip.findMany();
    if (!tips.length) {
      const tipImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644311731/tips/Emi-ZnAVkAEqtVq_esdtmh.jpg";
      const tipTitleEn = "Object methods";
      const tipTitleVi = "Object methods";
      const tipBodyEn = "Understand object methods better";
      const tipBodyVi = "Hiểu hơn về object methods";

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

    console.log("Init courses...");
    const courses = await prisma.course.findMany();
    if (!courses.length) {
      const courses = [
        {
          name: "JavaScript basics",
          level: "NEWBIE",
          descriptionEn:
            "Familiarize newbies with basic syntaxs and mindset of JavaScript. After completing this course, you can do a simple management system for library, store or school on CLI.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của JavaScript. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một hệ thống quản lý đơn giản cho thư viện, cửa hàng hoặc trường học.",
        },
        {
          name: "HTML basics",
          level: "NEWBIE",
          descriptionEn:
            "Familiarize newbies with basic syntaxs of HTML. After completing this course, you can do a simple e-book.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của HTML. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một e-book đơn giản.",
        },
        {
          name: "CSS basics",
          level: "NEWBIE",
          descriptionEn:
            "Familiarize newbies with basic syntaxs of CSS. After completing this course, you can make a beatiful static website.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của CSS. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một website tĩnh đẹp.",
        },
        {
          name: "JavaScript DOM",
          level: "FRESHER",
          descriptionEn:
            "Familiarize newbies with basic syntaxs of JavaScript in interating with DOM elements. After completing this course, you can make a completely statis website",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của JavaScript khi tương tác với các phần tử của trang web. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một website tĩnh hoàn thiện.",
        },
        {
          name: "JavaScript Advanced",
          level: "JUNIOR",
          descriptionEn:
            "Familiarize newbies with advanced syntaxs and features of JavaScript. After completing this course, you can be ready to learn React.js.",
          descriptionVi:
            "Làm quen với những cú pháp và tính năng nâng cao của JavaScript. Sau khi hoàn thành khóa học này, các bạn đã sẵn sàng cho khóa học React.js.",
        },
        {
          name: "Express.js",
          level: "JUNIOR",
          descriptionEn: "Build web server using the most common JavaScript backend framework Express.js.",
          descriptionVi: "Xây dựng web server sử dụng backend framework phổ biến nhất của JavaScript - Express.js.",
        },
        {
          name: "React.js",
          level: "JUNIOR",
          descriptionEn: "Build web UI using the most common JavaScript frontend library React.js.",
          descriptionVi: "Xây dựng giao diện web sử dụng thư viện frontend phổ biến nhất của JavaScript - React.js.",
        },
        {
          name: "School management system",
          level: "SENIOR",
          descriptionEn: "Build a school management system (real-product clone).",
          descriptionVi: "Xây dựng hệ thống quản lý trường học (clone từ sản phẩm thật).",
        },
      ];

      for (const course of courses) {
        const { name, level, descriptionEn, descriptionVi } = course;
        const newCourse = await prisma.course.create({
          data: {
            name,
            level: level as UserLevel,
            descriptionEn,
            descriptionVi,
          },
        });

        await prisma.lesson.createMany({
          data: [
            {
              order: 1,
              courseId: newCourse.id,
              videoId: "6lH-6Y805L4",
              examSrc: "https://replit.com/@hungdevjs/excelcomparing",
            },
            {
              order: 2,
              courseId: newCourse.id,
              videoId: "6lH-6Y805L4",
              examSrc: "https://replit.com/@hungdevjs/excelcomparing",
            },
          ],
        });
      }
    }
    console.log("Init courses successfully");

    console.log("Init roadmap...");
    const roadmaps = await prisma.roadmap.findMany();
    if (!roadmaps.length) {
      const newbieImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644381054/roadmap/newbie_f4xo3h.png";
      const fresherImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644381054/roadmap/student_j0bre4.png";
      const juniorImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644381054/roadmap/junior_uifwbz.png";
      const seniorImage = "https://res.cloudinary.com/dzlqhq434/image/upload/v1644381054/roadmap/programmer_fv3lrv.png";

      await prisma.roadmap.createMany({
        data: [
          {
            level: "NEWBIE",
            image: newbieImage,
            name: "Newbie",
            descriptionEn: "Start your journey today. Don't waste time!",
            descriptionVi: "Hãy bắt đầu ngay hôm nay để trở thành một developer trong tương lai!",
          },
          {
            level: "FRESHER",
            image: fresherImage,
            name: "Fresher",
            descriptionEn: "Keep going. You did it very well!",
            descriptionVi: "Cố lên. Thêm chút nữa!",
          },
          {
            level: "JUNIOR",
            image: juniorImage,
            name: "Junior",
            descriptionEn:
              "Very good! Now you're a junior developer. You can get a job right now but we recommend you to complete our learning strategy to be a fullstack developer!",
            descriptionVi:
              "Tuyệt vời! Bạn đã là một junior developer rồi. Bạn có thể ứng tuyển việc làm ngay tại thời điểm này nhưng chúng tôi khuyên bạn nên hoàn thành toàn bộ roadmap để trở thành một fullstack developer!",
          },
          {
            level: "SENIOR",
            image: seniorImage,
            name: "Senior",
            descriptionEn: "You're absolutely a great developer. Start applying for jobs right now! Proud of you!",
            descriptionVi:
              "Chúc mừng bạn đã hoàn thành toàn bộ roadmap. Chúc bạn tự tin và có được công việc mong muốn. Tự hào về bạn!",
          },
        ],
      });
    }
    console.log("Init roadmap successfully");

    console.log("Init data successfully");
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
};

export default seed;
