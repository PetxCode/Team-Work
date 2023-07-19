import { Response } from "express";
import { Request } from "express-validator/src/base";
import { Any, DataSource, QueryBuilder } from "typeorm";
import { AssignRoleEntity } from "../model/AdminEntity/AssignRoleEntity";
import { OfficeEntity } from "../model/AdminEntity/OfficeEntity";
// import { AssignRoleEntity } from "../model/AdminEntity/AssignRoleEntity";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { HTTP } from "../utils/constants/HTTP";
import { mainRoles } from "../utils/constants/roles";
import { AppDataSource } from "../utils/dataBase";
import { mainAppErrorHandler } from "../utils/error/errorDefiner";
import {
  iRole,
  iRoleData,
  iUser,
  iUserData,
} from "../utils/interfaces/userInterface";
import { OrganisationEntity } from "../model/AdminEntity/OrganisationEntity";

export const createOrganisation = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    let { userID } = req.params;

    console.log(userID);

    // const definedData = {
    //   where: { id: userID },
    //   relations: ["organisation"],
    // };

    // const getUser: any = await UserEntity.findOne(definedData);

    // console.log(getUser);

    // const createOrg = OrganisationEntity.create({
    //   title,
    // }).save();

    // getUser.office = createOrg;
    // getUser.save();

    res.status(201).json({
      message: "Organisation created",
      //   data: {
      //     createOrg,
      //     getUser,
      //   },
    });
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to create role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Role creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Role creation Error",
      data: error.message,
    });
  }
};

export const createOfficeRoles = async (req: Request, res: Response) => {
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

    const getOffice: any = await OfficeEntity.findOne(definedData);
    const getUser: any = await UserEntity.findOne(userData);

    const checkRole = getOffice.role.findIndex(
      (el: { role: string }) => el.role === role,
    );

    if (checkRole < 0) {
      const createRole = AssignRoleEntity.create({
        role,
      });
      getOffice.role = [...getOffice.role, createRole];

      await createRole.save();
      getOffice.save();
      getUser.save();

      res.json({
        data: {
          createRole,
          getUser,
          getOffice,
        },
      });
    } else {
      return res.status(HTTP.UNAUTHORIZED).json({
        message: "Role already exist for this Office...",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to create role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Role creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Role creation Error",
      data: error.message,
    });
  }
};

export const updateUserRoles = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    role.push(mainRole);

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "ADMIN") {
      UserEntity.merge(user, { role });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const updateUserRolesTitle = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    role.push(mainRole);

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "Admin") {
      UserEntity.merge(user, { title });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const removeUserRoles = async (req: Request, res: Response) => {
  try {
    const role: Array<string> = [];

    const { title, mainRole } = req.body;
    let { adminID, userID } = req.params;

    const user: any = UserEntity.findOne({ where: { id: userID } });
    const adminUser: any = UserEntity.findOne({ where: { id: adminID } });

    if (adminUser.role === "ADMIN") {
      let remove = user.role.filter((el: string) => {
        el !== mainRole;
      });

      UserEntity.merge(user, { remove });

      res.status(HTTP.OK).json({
        message: "Getting User",
        data: remove,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "You can create This",
      });
    }
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  const role: Array<string> = [];

  const { title, mainRole } = req.body;
  const { id } = req.params;
  role.push(mainRole);

  // const user: iUserData<any> = UserEntity.findOne({ where: { id } });
  const user = await AppDataSource.getRepository(UserEntity)
    .createQueryBuilder("UserEntity")
    .leftJoinAndSelect("UserEntity.role", "role")
    .where("UserEntity.id = :id", {
      id,
    })
    .getOne();

  res.status(HTTP.OK).json({
    message: "Getting User",
    data: user,
  });
  try {
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};

export const getRoleRoles = async (req: Request, res: Response) => {
  const role: Array<string> = [];

  const { title, mainRole } = req.body;
  const { id } = req.params;
  role.push(mainRole);

  const optionalData = {
    where: { id },
    relations: ["role"],
  };

  const user: iUserData<any> = UserEntity.findOne(optionalData);

  res.status(HTTP.OK).json({
    message: "Getting User",
    data: user,
  });
  try {
  } catch (error) {
    new mainAppErrorHandler({
      message: `Unable to get User role for this User`,
      status: HTTP.BAD_REQUEST,
      name: "Get Role Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Get Role Error Found",
      data: error.message,
    });
  }
};
