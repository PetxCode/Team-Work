import express from "express";
import {
  createLevel,
  deleteLevel,
  readLevel,
  updateLevel,
} from "../controller/student/levelController";

const router = express.Router();

router.route("/:schoolID/create-level").post(createLevel);
router.route("/:schoolID/get-level").get(readLevel);

router.route("/:id/update-level").patch(updateLevel);
router.route("/:id/delete-level").delete(deleteLevel);

export default router;
