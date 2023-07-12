import { Request, Response } from "express";

import { HTTP } from "../../utils/constants/HTTP";
import { mainAppErrorHandler } from "../../utils/error/errorDefiner";

import { studentEntity } from "../../model/AdminEntity/studentEntity";
import { EnterCourseEntity } from "../../model/studentConcern/enterCourseEntityModel";
import { RegisterEntity } from "../../model/studentConcern/registerCourse";
import { UserEntity } from "../../model/AdminEntity/UserEntity";
import { CourseEntity } from "../../model/AdminEntity/courseEntity";

export const registerStudentCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { registerID, studentID } = req.params;
    const { courseCode } = req.body;

    const getStudent = await studentEntity.findOne({
      where: { id: studentID },
    });

    const getSchool = await UserEntity.findOne({
      where: { userName: getStudent.schoolName },
      relations: ["course"],
    }).then((res) => {
      // console.log(res.course.length);
      return res.course.find((el) => el.courseCode === courseCode);
    });

    if (!getSchool) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `This Course Code ${courseCode} isn't correct `,
      });
    }

    const getCourse = await RegisterEntity.findOne({
      where: { id: registerID },
      relations: ["course"],
    });

    const registerMyCourse = await EnterCourseEntity.create({
      courseCode: getSchool?.courseCode,
      courseUnit: getSchool?.courseUnit,
      courseName: getSchool?.courseName,
      semester: getSchool?.semester,
      level: getSchool?.level,
    }).save();

    getCourse.course = [...getCourse.course, registerMyCourse];
    getCourse.save();

    return res.status(HTTP.OK).json({
      message: "course successfully created",
      // data: registerMyCourse,
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

export const viewStudentCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { registerID } = req.params;

    const getCourse = await RegisterEntity.findOne({
      where: { id: registerID },
      relations: ["course", "register"],
    });

    return res.status(HTTP.OK).json({
      message: "view student course successfully",
      data: getCourse,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable view student course`,
      status: HTTP.BAD_REQUEST,
      name: "view student course Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteStudentCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { studentID, registerID } = req.params;

    const getStudent = await studentEntity.delete({
      id: studentID,
    });

    const getCourse = await EnterCourseEntity.delete({
      id: registerID,
    });

    return res.status(HTTP.OK).json({
      message: "deleting student course successfully",
      data: getCourse,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable view student deleted`,
      status: HTTP.BAD_REQUEST,
      name: "deleting student course Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
