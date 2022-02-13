const Errors = {
  BadCredential: "BadCredential",
  BadRequest: "BadRequest",
  Course: {
    NotJoin: "YouDidntJoinThisCourse",
    AlreadyJoined: "YouAlreadyJoinedThisCourse",
    LowLevel: "YourLevelIsLowerThanCourseLevel",
    ExamUrlEmpty: "ExamUrlIsEmpty",
    PleaseDoLessonSequentially: "PleaseDoLessonSequentially",
  },
  Account: {
    NameIsEmpty: "NameIsEmpty",
  },
};

export default Errors;
