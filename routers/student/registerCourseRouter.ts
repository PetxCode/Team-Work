import express from "express";
import {
  deleteRegisterCourse,
  registerCourse,
} from "../../controller/student/registerCourseConstroller";

const router = express.Router();

router.route("/:studentID/create-course").post(registerCourse);


router.route("/:courseID/delete-course").delete(deleteRegisterCourse);

export default router;
