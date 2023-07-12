"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controller/roleController");
const router = express_1.default.Router();
router.route("/get-user-role").get(roleController_1.getRoleRoles);
router.route("/:id/get-user-role").get(roleController_1.getUserRoles);
router.route("/:userID/create-office-role").post(roleController_1.createOffice);
router
    .route("/:userID/:officeID/create-user-office-role")
    .post(roleController_1.createOfficeRoles);
exports.default = router;
//# sourceMappingURL=roleRouter.js.map