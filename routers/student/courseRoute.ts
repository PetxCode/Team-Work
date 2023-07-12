import express from "express";
import {
  createCourse,
  deleteCourse,
  readCourse,
  readCourses,
  updateCourse,
} from "../../controller/student/courseController";

const router = express.Router();

router.route("/:schoolID/create-course").post(createCourse);

router.route("/:schoolID/get-all-course").get(readCourses);

router.route("/:courseID/get-course").get(readCourse);

router.route("/:id/update-course").patch(updateCourse);
router.route("/:id/delete-course").delete(deleteCourse);

export default router;
