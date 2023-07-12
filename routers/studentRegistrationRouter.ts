import express from "express";
import {
  registerStudent,
  deleteStudent,
  readStudent,
  readStudents,
  updateStudentInfo,
} from "../controller/studentController";

const router = express.Router();

router.route("/:schoolID/register-student").post(registerStudent);

router.route("/:id/get-student").get(readStudent);
router.route("/:id/get-all-student").get(readStudents);
router.route("/:id/get-student-info").patch(updateStudentInfo);
router.route("/:id/delete-student").delete(deleteStudent);

export default router;
