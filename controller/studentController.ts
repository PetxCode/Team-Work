import { Request, Response } from "express";
import { mainAppErrorHandler } from "../utils/error/errorDefiner";
import { HTTP } from "../utils/constants/HTTP";
import { studentEntity } from "../model/AdminEntity/studentEntity";
import { UserEntity } from "../model/AdminEntity/UserEntity";

export const registerStudent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;
    const { fullName, email, password } = req.body;

    const getSchool = await UserEntity.findOne({
      where: {
        id: schoolID,
      },
      relations: ["student"],
    });

    const createdStudent = await studentEntity
      .create({
        fullName,
        email,
        password,
        schoolName: getSchool?.userName,
        status: "student",
        level: "100Level",
        verified: true,
        school: getSchool,
      })
      .save();

    getSchool.student = [...getSchool.student, createdStudent];
    await getSchool.save();

    return res.status(HTTP.OK).json({
      message: "student successfully created",
      data: createdStudent,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to register student`,
      status: HTTP.BAD_REQUEST,
      name: "Student Registration Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found in starting up",
      data: err.message,
    });
  }
};

export const readStudent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const getStudent = await studentEntity.findOne({
      where: {
        id,
      },
      relations: ["register"],
    });

    return res.status(HTTP.OK).json({
      message: "reading student successfully!",
      data: getStudent,
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

export const readStudents = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const getStudent = await studentEntity.find();

    return res.status(HTTP.OK).json({
      message: "reading students successfully!",
      data: getStudent,
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

export const updateStudentInfo = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { fullName } = req.body;
    const { id } = req.params;

    const getStudent = await studentEntity.findOne({
      where: { id },
    });

    const updateStudentInfo = studentEntity.merge(getStudent, { fullName });

    return res.status(HTTP.OK).json({
      message: "student Name updated successfully!",
      data: updateStudentInfo,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update level`,
      status: HTTP.BAD_REQUEST,
      name: "Student Name Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    const getStudent = await studentEntity.delete({
      id,
    });

    return res.status(HTTP.OK).json({
      message: "Student deleted successfully!",
      data: getStudent,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to delete Student`,
      status: HTTP.BAD_REQUEST,
      name: "Studnet Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
