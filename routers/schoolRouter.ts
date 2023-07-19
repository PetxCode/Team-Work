import express from "express";
import {
  deleteRegisteredSchool,
  registerSchool,
  viewAllSchool,
  viewRegisterSchool,
} from "../controller/schoolController";

const router = express.Router();

router.route("/:userID/create-school").post(registerSchool);
router.route("/view-school").get(viewAllSchool);
router.route("/:schoolID/delete-school").delete(deleteRegisteredSchool);
router.route("/:schoolID/view-school-details").get(viewRegisterSchool);

export default router;
