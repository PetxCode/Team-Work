import express from "express";
import {
  createStaff,
  deleteStaff,
  updateStaffCourseByAdmin,
  updateStaffInfo,
  updateStaffInfoByAdmin,
  viewRegisterStaff,
} from "../../controller/staff/staffController";

const router = express.Router();

router.route("/:schoolID/register-staff").post(createStaff);
router.route("/:schoolID/view-staffs").get(viewRegisterStaff);

router.route("/:staffID/update-staffs-info").patch(updateStaffInfo);
router.route("/:staffID/update-staff").delete(deleteStaff);

router
  .route("/:schoolID/:staffID/admin-update-staffs-info")
  .patch(updateStaffInfoByAdmin);

router
  .route("/:schoolID/:staffID/admin-update-staffs-course")
  .patch(updateStaffCourseByAdmin);

export default router;
