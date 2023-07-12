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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleRoles = exports.getUserRoles = exports.removeUserRoles = exports.updateUserRolesTitle = exports.updateUserRoles = exports.createOfficeRoles = exports.createOffice = void 0;
const AssignRoleEntity_1 = require("../model/AdminEntity/AssignRoleEntity");
const OfficeEntity_1 = require("../model/AdminEntity/OfficeEntity");
// import { AssignRoleEntity } from "../model/AdminEntity/AssignRoleEntity";
const UserEntity_1 = require("../model/AdminEntity/UserEntity");
const HTTP_1 = require("../utils/constants/HTTP");
const dataBase_1 = require("../utils/dataBase");
const errorDefiner_1 = require("../utils/error/errorDefiner");
const createOffice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, mainRole } = req.body;
        let { adminID, userID, officeID } = req.params;
        const definedData = {
            where: { id: userID },
            relations: ["office"],
        };
        const getUser = yield UserEntity_1.UserEntity.findOne(definedData);
        const createOffice = OfficeEntity_1.OfficeEntity.create({
            title,
        });
        getUser.office = createOffice;
        yield createOffice.save();
        getUser.save();
        res.json({
            data: {
                createOffice,
                getUser,
            },
        });
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Role creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Role creation Error",
            data: error.message,
        });
    }
});
exports.createOffice = createOffice;
const createOfficeRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, mainRole } = req.body;
        let { adminID, userID, officeID } = req.params;
        const definedData = {
            where: { id: officeID },
            relations: ["role"],
        };
        const userData = {
            where: { id: userID },
            relations: ["office"],
        };
        const getOffice = yield OfficeEntity_1.OfficeEntity.findOne(definedData);
        const getUser = yield UserEntity_1.UserEntity.findOne(userData);
        const checkRole = getOffice.role.findIndex((el) => el.role === role);
        if (checkRole < 0) {
            const createRole = AssignRoleEntity_1.AssignRoleEntity.create({
                role,
            });
            getOffice.role = [...getOffice.role, createRole];
            yield createRole.save();
            getOffice.save();
            getUser.save();
            res.json({
                data: {
                    createRole,
                    getUser,
                    getOffice,
                },
            });
        }
        else {
            return res.status(HTTP_1.HTTP.UNAUTHORIZED).json({
                message: "Role already exist for this Office...",
            });
        }
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to create role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Role creation Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Role creation Error",
            data: error.message,
        });
    }
});
exports.createOfficeRoles = createOfficeRoles;
const updateUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = [];
        const { title, mainRole } = req.body;
        let { adminID, userID } = req.params;
        role.push(mainRole);
        const user = UserEntity_1.UserEntity.findOne({ where: { id: userID } });
        const adminUser = UserEntity_1.UserEntity.findOne({ where: { id: adminID } });
        if (adminUser.role === "ADMIN") {
            UserEntity_1.UserEntity.merge(user, { role });
            res.status(HTTP_1.HTTP.OK).json({
                message: "Getting User",
                data: user,
            });
        }
        else {
            return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
                message: "You can create This",
            });
        }
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to get User role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Get Role Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Get Role Error Found",
            data: error.message,
        });
    }
});
exports.updateUserRoles = updateUserRoles;
const updateUserRolesTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = [];
        const { title, mainRole } = req.body;
        let { adminID, userID } = req.params;
        role.push(mainRole);
        const user = UserEntity_1.UserEntity.findOne({ where: { id: userID } });
        const adminUser = UserEntity_1.UserEntity.findOne({ where: { id: adminID } });
        if (adminUser.role === "Admin") {
            UserEntity_1.UserEntity.merge(user, { title });
            res.status(HTTP_1.HTTP.OK).json({
                message: "Getting User",
                data: user,
            });
        }
        else {
            return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
                message: "You can create This",
            });
        }
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to get User role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Get Role Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Get Role Error Found",
            data: error.message,
        });
    }
});
exports.updateUserRolesTitle = updateUserRolesTitle;
const removeUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = [];
        const { title, mainRole } = req.body;
        let { adminID, userID } = req.params;
        const user = UserEntity_1.UserEntity.findOne({ where: { id: userID } });
        const adminUser = UserEntity_1.UserEntity.findOne({ where: { id: adminID } });
        if (adminUser.role === "ADMIN") {
            let remove = user.role.filter((el) => {
                el !== mainRole;
            });
            UserEntity_1.UserEntity.merge(user, { remove });
            res.status(HTTP_1.HTTP.OK).json({
                message: "Getting User",
                data: remove,
            });
        }
        else {
            return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
                message: "You can create This",
            });
        }
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to get User role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Get Role Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Get Role Error Found",
            data: error.message,
        });
    }
});
exports.removeUserRoles = removeUserRoles;
const getUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = [];
    const { title, mainRole } = req.body;
    const { id } = req.params;
    role.push(mainRole);
    // const user: iUserData<any> = UserEntity.findOne({ where: { id } });
    const user = yield dataBase_1.AppDataSource.getRepository(UserEntity_1.UserEntity)
        .createQueryBuilder("UserEntity")
        .leftJoinAndSelect("UserEntity.role", "role")
        .where("UserEntity.id = :id", {
        id,
    })
        .getOne();
    res.status(HTTP_1.HTTP.OK).json({
        message: "Getting User",
        data: user,
    });
    try {
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to get User role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Get Role Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Get Role Error Found",
            data: error.message,
        });
    }
});
exports.getUserRoles = getUserRoles;
const getRoleRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = [];
    const { title, mainRole } = req.body;
    const { id } = req.params;
    role.push(mainRole);
    const optionalData = {
        where: { id },
        relations: ["role"],
    };
    const user = UserEntity_1.UserEntity.findOne(optionalData);
    res.status(HTTP_1.HTTP.OK).json({
        message: "Getting User",
        data: user,
    });
    try {
    }
    catch (error) {
        new errorDefiner_1.mainAppErrorHandler({
            message: `Unable to get User role for this User`,
            status: HTTP_1.HTTP.BAD_REQUEST,
            name: "Get Role Error",
            isSuccess: false,
        });
        return res.status(HTTP_1.HTTP.BAD_REQUEST).json({
            message: "Get Role Error Found",
            data: error.message,
        });
    }
});
exports.getRoleRoles = getRoleRoles;
//# sourceMappingURL=roleController.js.map