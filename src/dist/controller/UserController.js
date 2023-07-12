"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.changePassword = exports.resetMail = exports.verifyUser = exports.createUser = exports.updateUser = exports.deleteUser = exports.getOneUser = exports.getUser = void 0;
const UserEntity_1 = require("../model/AdminEntity/UserEntity");
const HTTP_1 = require("../utils/constants/HTTP");
const errorDefiner_1 = require("../utils/error/errorDefiner");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schools = yield UserEntity_1.UserEntity.find();
        return res.status(HTTP_1.HTTP.OK).json({
            message: "Viewing all schools",
            data: schools,
        });
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to view schools for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.OK).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.getUser = getUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const school = yield UserEntity_1.UserEntity.findOne({
            where: {
                id,
            },
        });
        return res.status(HTTP_1.HTTP.OK).json({
            message: "Viewing school detail",
            data: school,
        });
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.getOneUser = getOneUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const removedSchool = yield UserEntity_1.UserEntity.delete({ id });
        return res.status(HTTP_1.HTTP.OK).json({
            message: "school has been delete",
            data: removedSchool,
        });
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName } = req.body;
        const school = yield UserEntity_1.UserEntity.findOne({
            where: {
                id,
            },
        });
        const updateSchoolInfo = yield UserEntity_1.UserEntity.merge(school, { userName });
        return res.status(HTTP_1.HTTP.OK).json({
            message: "Updating school's info",
            data: updateSchoolInfo,
        });
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.updateUser = updateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolName, userName, email, password } = req.body;
        const tokenData = crypto_1.default.randomBytes(16).toString("hex");
        console.log(tokenData);
        const checkIfExist = yield UserEntity_1.UserEntity.findOne({
            where: { email },
        });
        if (checkIfExist) {
            return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                message: "This user does exist",
            });
        }
        else {
            if (!password) {
                new errorDefiner_1.mainAppErrorHandler({
                    message: `Please put in a password`,
                    status: HTTP_1.HTTP.BAD_REQUEST,
                    name: "No password Error",
                    isSuccess: false,
                });
                return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
                    message: "PLease enter your choice password",
                });
            }
            else {
                const slt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(password, slt);
                const admin = yield UserEntity_1.UserEntity.create({
                    userName,
                    email,
                    password: hash,
                    token: tokenData,
                    verified: false,
                }).save();
                (0, email_1.verifiedUserMail)(admin)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(HTTP_1.HTTP.CREATED).json({
                    message: "Please check your mail to verify your account",
                    data: admin,
                });
            }
        }
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err.message,
        });
    }
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const findAdmin = yield UserEntity_1.UserEntity.findOne({
            where: { id },
        });
        if (!findAdmin) {
            return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                message: "This user does not exist",
            });
        }
        else {
            if (findAdmin.token !== "" && findAdmin.token === token) {
                const admin = yield UserEntity_1.UserEntity.merge(findAdmin, {
                    token: "",
                    verified: true,
                }).save();
                return res.status(HTTP_1.HTTP.OK).json({
                    message: "Your account has been verified, you can nnow sign in...!",
                    data: admin,
                });
            }
        }
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.verifyUser = verifyUser;
const resetMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const { email } = req.body;
        const findAdmin = yield UserEntity_1.UserEntity.findOne({
            where: { email },
        });
        if (!findAdmin) {
            return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                message: "This user does not exist",
            });
        }
        else {
            if (findAdmin.token === "" && findAdmin.verified === true) {
                const newToken = crypto_1.default.randomBytes(32).toString("hex");
                const admin = yield UserEntity_1.UserEntity.merge(findAdmin, {
                    token: newToken,
                }).save();
                (0, email_1.resetUserPassword)(admin)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(HTTP_1.HTTP.OK).json({
                    message: "Please check your email to continue",
                    data: admin,
                });
            }
        }
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.resetMail = resetMail;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const { password } = req.body;
        const findAdmin = yield UserEntity_1.UserEntity.findOne({
            where: { id },
        });
        if (!findAdmin) {
            return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                message: "This user does not exist",
            });
        }
        else {
            if (findAdmin.token !== "" && findAdmin.token === token) {
                const slt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, slt);
                const admin = yield UserEntity_1.UserEntity.merge(findAdmin, {
                    password: hashed,
                    token: "",
                }).save();
                return res.status(HTTP_1.HTTP.OK).json({
                    message: "Your password has been changed, you can now sign in",
                    data: admin,
                });
            }
        }
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.changePassword = changePassword;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findAdmin = yield UserEntity_1.UserEntity.findOne({
            where: { email },
        });
        if (!findAdmin) {
            return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                message: "This user does not exist",
            });
        }
        else {
            if (findAdmin.token === "" && findAdmin.verified === true) {
                console.log("check for Password");
                const decryptPassword = yield bcrypt_1.default.compare(password, findAdmin.password);
                if (decryptPassword) {
                    const encrypt = jsonwebtoken_1.default.sign({
                        id: findAdmin.id,
                        email: findAdmin.email,
                        userName: findAdmin.userName,
                    }, process.env.SIG_SECRET, { expiresIn: process.env.SIG_EXPIRES });
                    return res.status(HTTP_1.HTTP.OK).json({
                        message: `Welcome back ${findAdmin.userName}`,
                        data: { findAdmin, encrypt },
                    });
                }
                else {
                    return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                        message: "Your password isn't correct",
                    });
                }
            }
            else {
                return res.status(HTTP_1.HTTP.FORBIDDEN).json({
                    message: "This Account hasn't been Verified",
                });
            }
        }
    }
    catch (err) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create school for Admin`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "School creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: err,
        });
    }
});
exports.signin = signin;
// export const getUser = async (req: Request, res: Response): Promise<Response> => {
//     try {
//     } catch (err) {
//         new mainAppErrorHandler({
//           message: `Unable to create school for Admin`,
//           status: HTTP.BAD_REQUEST,
//           name: "School creation Error",
//           isSuccess: false,
//         });
//   return res.status(HTTP.BAD_REQUEST).json({
//     message: "Error Found",
//     data: err,
//   });
//     }
// }
//# sourceMappingURL=UserController.js.map