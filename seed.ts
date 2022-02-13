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
      const images = {
        jsBasic: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478248/courses/javascript_udds8e.png",
        html5: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478247/courses/html5_vyjkhw.png",
        css3: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478247/courses/css3_oiqvtp.png",
        jsDom: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478248/courses/javascript2_cw08bs.png",
        jsAdvanced: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478247/courses/javascript3_pnwvnv.png",
        expressjs: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478247/courses/nodejs_cmhaw0.png",
        reactjs: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478248/courses/react_ahsyzj.png",
        senior: "https://res.cloudinary.com/dzlqhq434/image/upload/v1644478527/courses/hacker_h9ue9f.png",
      };
      const courses = [
        {
          name: "JavaScript basics",
          level: "NEWBIE",
          image: images.jsBasic,
          descriptionEn:
            "Familiarize newbies with basic syntaxs and mindset of JavaScript. After completing this course, you can do a simple management system for library, store or school on CLI.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của JavaScript. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một hệ thống quản lý đơn giản cho thư viện, cửa hàng hoặc trường học.",
        },
        {
          name: "HTML basics",
          level: "NEWBIE",
          image: images.html5,
          descriptionEn:
            "Familiarize newbies with basic syntaxs of HTML. After completing this course, you can do a simple e-book.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của HTML. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một e-book đơn giản.",
        },
        {
          name: "CSS basics",
          level: "NEWBIE",
          image: images.css3,
          descriptionEn:
            "Familiarize newbies with basic syntaxs of CSS. After completing this course, you can make a beatiful static website.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của CSS. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một website tĩnh đẹp.",
        },
        {
          name: "JavaScript DOM",
          level: "FRESHER",
          image: images.jsDom,
          descriptionEn:
            "Familiarize newbies with basic syntaxs of JavaScript in interating with DOM elements. After completing this course, you can make a completely statis website.",
          descriptionVi:
            "Làm quen với cú pháp cơ bản của JavaScript khi tương tác với các phần tử của trang web. Sau khi hoàn thành khóa học này, các bạn có thể xây dựng một website tĩnh hoàn thiện.",
        },
        {
          name: "JavaScript Advanced",
          level: "JUNIOR",
          image: images.jsAdvanced,
          descriptionEn:
            "Familiarize newbies with advanced syntaxs and features of JavaScript. After completing this course, you can be ready to learn React.js.",
          descriptionVi:
            "Làm quen với những cú pháp và tính năng nâng cao của JavaScript. Sau khi hoàn thành khóa học này, các bạn đã sẵn sàng cho khóa học React.js.",
        },
        {
          name: "Express.js",
          level: "JUNIOR",
          image: images.expressjs,
          descriptionEn: "Build web server using the most common JavaScript backend framework Express.js.",
          descriptionVi: "Xây dựng web server sử dụng backend framework phổ biến nhất của JavaScript - Express.js.",
        },
        {
          name: "React.js",
          level: "SENIOR",
          image: images.reactjs,
          descriptionEn: "Build web UI using the most common JavaScript frontend library React.js.",
          descriptionVi: "Xây dựng giao diện web sử dụng thư viện frontend phổ biến nhất của JavaScript - React.js.",
        },
        {
          name: "School management system",
          level: "SENIOR",
          image: images.senior,
          descriptionEn: "Build a school management system (real-product clone).",
          descriptionVi: "Xây dựng hệ thống quản lý trường học (clone từ sản phẩm thật).",
        },
      ];

      for (const course of courses) {
        const { name, level, image, descriptionEn, descriptionVi } = course;
        const newCourse = await prisma.course.create({
          data: {
            name,
            level: level as UserLevel,
            image,
            descriptionEn,
            descriptionVi,
          },
        });

        await prisma.lesson.createMany({
          data: [
            {
              order: 1,
              nameEn: "Lesson 1",
              nameVi: "Bài giảng 1",
              courseId: newCourse.id,
              videoId: "6lH-6Y805L4",
              examSrc: "https://replit.com/@hungdevjs/excelcomparing",
            },
            {
              order: 2,
              nameEn: "Lesson 2",
              nameVi: "Bài giảng 2",
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

    console.log("Init FAQs...");
    const faqs = await prisma.faq.findMany();
    if (!faqs.length) {
      await prisma.faq.createMany({
        data: [
          {
            questionEn: "What is JackScript learning model?",
            questionVi: "Mô hình học của JackScript là gì?",
            answerEn:
              "JackScript is an e-learning platform to help students in colleges and universities to learn programming like they are developers. JackScript is suitable for students who want to get a job as a developer after or even when they're in colleges/universities. For the moment, JackScript is totally online and free but we will also open offline classes and give students chances to join us as interns soon.",
            answerVi:
              "JackScript là một nền tảng học lập trình online, thích hợp cho các bạn sinh viên đang học tập tại các trường đại học, giúp các bạn có thể học lập trình và thực hành như một developer thực thụ. Các bạn có thể trở thành lập trình viên khi vừa ra trường hoặc ngay cả khi còn đang đi học. Hiện tại JackScript hoàn toàn hoạt động online và miễn phí, tuy nhiên các lớp học offline sẽ được triển khai sớm và các bạn sinh viên sẽ được trao cơ hội học tập và làm việc trong tương lai.",
          },
          {
            questionEn: "What to learn on JackScript?",
            questionVi: "Học những gì trên JackScript?",
            answerEn:
              "Rightnow we have courses for almost levels, from Newbie to Senior (the titles are just used on JackScript platform). The courses are about HTML, CSS and JavaScript. After completing all these courses, you can be a fullstack web developer. Most important, we don't just teach you about technologies, we teach you the basics and we want you to know how to learn and how to control theirs learning progress so you can learn anything you want without mentors in the future.",
            answerVi:
              "Có nhiều khóa học với các trình độ khác nhau, từ Newbie đến Senior (các trình độ chỉ sử dụng trên nền tảng JackScript). Các khóa học về HTML, CSS và JavaScript. Sau khi hoàn thành các khóa học, bạn có thể trở thành fullstack web developer. Quan trọng hơn, với JackScript, bạn không chỉ học về công nghệ, bạn sẽ được học cơ bản về công nghệ mà còn được hướng dẫn cách học tập hiểu quả để có thể tự học trong tương lai.",
          },
          {
            questionEn: "Is the knowledge fully complete?",
            questionVi: "Kiến thức trong các khóa học có đầy đủ không?",
            answerEn:
              "In fact, we don't teach you all the things about technologies. We just teach them the basics and the most common things that are used in real developing web applications. So you can quickly familiarize with how developers work in real projects. Remember that you don't need to know everything to be a developer.",
            answerVi:
              "Thực tế, JackScript không dạy đầy đủ tất cả mà chỉ dạy những thứ cơ bản và những thứ được sử dụng nhiều nhất trong công việc hàng ngày của một web application developer. Bạn sẽ nhanh chóng quen với các dự án thực tế và không cần những kiến thức không dùng đến. Luôn nhớ rằng bạn không cần biết tất cả để trở thành một developer.",
          },
          {
            questionEn: "How much time it takes to be a developer?",
            questionVi: "Cần bao nhiêu thời gian để có thể trở thành một developer?",
            answerEn: "It will take about 4 to 6 months with hard work to follow our roadmap and become a developer.",
            answerVi:
              "Thời gian để hoàn thành lộ trình học và trở thành một developer sẽ từ 4 đến 6 tháng nếu bạn chăm chỉ và nghiêm túc.",
          },
          {
            questionEn: "How are learners supported?",
            questionVi: "Người học được hỗ trợ thế nào?",
            answerEn:
              "We have online mentors to support you in our platform, just ask anytime you want. We also check your exam and help you to improve your code. After you complete the roadmap, we will also send your CV to our partners so you can get a job.",
            answerVi:
              "JackScript có các mentor sẵn sàng trợ giúp online, cứ hỏi bất cứ khi nào bạn cần giúp đỡ. Chúng tôi cũng kiểm tra bài tập của bạn và giúp bạn viết code tốt hơn. Sau khi hoàn thành lộ trình học, CV của bạn sẽ được gửi đến các đối tác của JackScript và bạn sẽ có cơ hội apply và nhận việc làm.",
          },
        ],
      });
    }
    console.log("Init FAQs successfully");

    console.log("Init data successfully");
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
};

export default seed;
