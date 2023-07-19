import { Request, Response } from "express";
import { mainAppErrorHandler } from "../../utils/error/errorDefiner";
import { HTTP } from "../../utils/constants/HTTP";
import { LevelEntity } from "../../model/studentConcern/LevelEntity";
import { UserEntity } from "../../model/AdminEntity/UserEntity";
import { SchoolEntity } from "../../model/AdminEntity/SchoolEntity";

export const createLevel = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { levelTitle } = req.body;
    const { schoolID } = req.params;

    const getSchool = await SchoolEntity.findOne({
      where: { id: schoolID },
      relations: ["schoolLevels"],
    });

    //   const checkLevel = await User

    const createdLevel = await LevelEntity.create({
      levelTitle,
    }).save();

    getSchool.schoolLevels = [...getSchool.schoolLevels, createdLevel];
    getSchool.save();

    console.log(getSchool);

    return res.status(HTTP.OK).json({
      message: "Level successfully created",
      data: createdLevel,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to create level`,
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

export const readLevel = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;
    const getLevel = await SchoolEntity.findOne({
      where: { id: schoolID },
      relations: ["schoolLevels"],
    });

    return res.status(HTTP.OK).json({
      message: "read successfully!",
      data: getLevel,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to read level`,
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

export const updateLevel = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { levelTitle } = req.body;
    const { id } = req.params;

    const getLevel = await LevelEntity.findOne({
      where: { id },
    });

    const updateLevelInfo = LevelEntity.merge(getLevel, { levelTitle });
    updateLevelInfo.save();

    return res.status(HTTP.OK).json({
      message: "level updated successfully!",
      data: updateLevelInfo,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update level`,
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

export const deleteLevel = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID, id } = req.params;

    const getLevel: any = await LevelEntity.delete({
      id,
    });

    return res.status(HTTP.OK).json({
      message: "level deleted successfully!!!",
      data: getLevel,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to delete level`,
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
