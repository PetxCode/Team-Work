"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.route("/").get(UserController_1.getUser);
router.route("/:id/get-one").get(UserController_1.getOneUser);
router.route("/:id/update-info").patch(UserController_1.updateUser);
router.route("/:id/delete-account").delete(UserController_1.deleteUser);
router.route("/create").post(UserController_1.createUser);
router.route("/:id/:token/verify").get(UserController_1.verifyUser);
router.route("/reset-password").patch(UserController_1.resetMail);
router.route("/:id/:token/change-password").patch(UserController_1.changePassword);
router.route("/signin").post(UserController_1.signin);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map