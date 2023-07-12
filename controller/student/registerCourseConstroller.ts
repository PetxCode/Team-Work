import { Request, Response } from "express";
import { UserEntity } from "../../model/AdminEntity/UserEntity";

import { HTTP } from "../../utils/constants/HTTP";
import { mainAppErrorHandler } from "../../utils/error/errorDefiner";
import { studentEntity } from "../../model/AdminEntity/studentEntity";
import { RegisterEntity } from "../../model/studentConcern/registerCourse";
import { LevelEntity } from "../../model/studentConcern/LevelEntity";

export const registerCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { studentID } = req.params;
    const { registerTitle } = req.body;

    const getStudent = await studentEntity.findOne({
      where: { id: studentID },
      relations: ["register"],
    });

    const findLevel = await LevelEntity.findOne({
      where: { levelTitle: registerTitle },
    });

    // const findStudent = await studentEntity.findOne({
    //   where: { id: studentID },
    // });

    if (!findLevel) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `${registerTitle} isn't recorded`,
      });
    }
    const registerCourse = await RegisterEntity.create({
      registerTitle,
    }).save();

    getStudent.register = [...getStudent.register, registerCourse];
    getStudent.save();

    return res.status(HTTP.OK).json({
      message: "course successfully created",
      data: registerCourse,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create level`,
      status: HTTP.BAD_REQUEST,
      name: "Course creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteRegisterCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { courseID } = req.params;

    const getStudent = await RegisterEntity.delete({ id: courseID });

    return res.status(HTTP.OK).json({
      message: "course successfully deleted Now",
      data: getStudent,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create level`,
      status: HTTP.BAD_REQUEST,
      name: "Course creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
