import express from "express";
import {
  createOfficeRoles,
  getUserRoles,
  getRoleRoles,
  createOffice,
} from "../controller/roleController";

const router = express.Router();

router.route("/get-user-role").get(getRoleRoles);
router.route("/:id/get-user-role").get(getUserRoles);
router.route("/:userID/create-office-role").post(createOffice);

router
  .route("/:userID/:officeID/create-user-office-role")
  .post(createOfficeRoles);
export default router;
