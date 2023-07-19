import { Request, Response } from "express";
import { HTTP } from "../utils/constants/HTTP";
import { RegisterEntity } from "../model/studentConcern/registerCourse";
import { mainAppErrorHandler } from "../utils/error/errorDefiner";
import { LevelEntity } from "../model/studentConcern/LevelEntity";
import { studentEntity } from "../model/AdminEntity/studentEntity";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { SchoolEntity } from "../model/AdminEntity/SchoolEntity";

export const registerSchool = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { title } = req.body;

    const user = await UserEntity.findOne({
      where: { id: userID },
      relations: ["mySchool"],
    });

    if (!user) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `Error isn't recorded`,
      });
    }
    const registerSchool = await SchoolEntity.create({
      title,
    }).save();

    user.mySchool = [...user.mySchool, registerSchool];
    user.save();

    return res.status(HTTP.OK).json({
      message: "course successfully created",
      data: registerSchool,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create School`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const viewRegisterSchool = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;
    const { title } = req.body;

    const school = await SchoolEntity.findOne({
      where: {
        id: schoolID,
      },
      relations: ["student", "course", "schoolLevels"],
    });

    // if (!user) {
    //   return res.status(HTTP.BAD_REQUEST).json({
    //     message: `Error isn't recorded`,
    //   });
    // }

    return res.status(HTTP.OK).json({
      message: "school successfully viewed",
      data: school,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create School`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const viewAllSchool = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const school = await SchoolEntity.find();

    // if (!user) {
    //   return res.status(HTTP.BAD_REQUEST).json({
    //     message: `Error isn't recorded`,
    //   });
    // }

    return res.status(HTTP.OK).json({
      message: "school successfully viewed",
      data: school,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create School`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteRegisteredSchool = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;

    const getSchool = await SchoolEntity.delete({ id: schoolID });

    return res.status(HTTP.OK).json({
      message: "school successfully deleted Now",
      data: getSchool,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create School`,
      status: HTTP.BAD_REQUEST,
      name: "School creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
