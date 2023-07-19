// organisation;
//

import express from "express";
import { createOrganisation } from "../controller/organisationController";

const router = express.Router();

// router.route("/get-user-role").get(getRoleRoles);
// router.route("/:id/get-user-role").get(getUserRoles);

router.route("/:userID/create-organisation").post(createOrganisation);

export default router;
