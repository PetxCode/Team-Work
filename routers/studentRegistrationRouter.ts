import express from "express";
import {
  registerStudent,
  deleteStudent,
  readStudentsFromSchool,
  readStudents,
  updateStudentInfo,
  readOneStudents,
} from "../controller/studentController";

const router = express.Router();

router.route("/:schoolID/register-student").post(registerStudent);

router.route("/:schoolID/get-student").get(readStudentsFromSchool);

router.route("/:schoolID/get-all-student").get(readStudents);

router.route("/:id/get-one-student-info").get(readOneStudents);

router.route("/:id/get-student-info").patch(updateStudentInfo);
router.route("/:id/delete-student").delete(deleteStudent);

export default router;
