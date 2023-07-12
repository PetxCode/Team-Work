import express from "express";
import {
  deleteStudentCourse,
  registerStudentCourse,
  viewStudentCourse,
} from "../../controller/student/registerStudentCourseController";

const router = express.Router();

router
  .route("/:studentID/:registerID/create-my-course")
  .post(registerStudentCourse);

router.route("/:registerID/delete-my-course").delete(deleteStudentCourse);

router.route("/:registerID/view-my-course").get(viewStudentCourse);

export default router;
