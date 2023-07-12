import { Request, Response } from "express";
import { mainAppErrorHandler } from "../../utils/error/errorDefiner";
import { HTTP } from "../../utils/constants/HTTP";
import { CourseEntity } from "../../model/AdminEntity/courseEntity";
import { UserEntity } from "../../model/AdminEntity/UserEntity";

export const createCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;
    const { courseName, courseCode, courseUnit, level, semester } = req.body;

    const getSchool = await UserEntity.findOne({
      where: { id: schoolID },
      relations: ["course"],
    });

    const createdCourse = await CourseEntity.create({
      level,
      courseName,
      courseCode,
      courseUnit,
      semester,
    }).save();

    getSchool.course = [...getSchool.course, createdCourse];
    await getSchool.save();

    return res.status(HTTP.OK).json({
      message: "course successfully created",
      data: createdCourse,
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

export const readCourses = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;

    const getSchool = await UserEntity.findOne({
      where: { id: schoolID },
      relations: ["course"],
    });

    // const getCourse = await CourseEntity.find();

    return res.status(HTTP.OK).json({
      message: "read all Course successfully!",
      data: getSchool,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to read course`,
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

export const readCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { courseID } = req.params;
    const getCourse = await CourseEntity.findOne({
      where: { id: courseID },
    });

    return res.status(HTTP.OK).json({
      message: "read one Course successfully!",
      data: getCourse,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to read course`,
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

export const updateCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { level, courseUnit, courseCode, courseName } = req.body;
    const { id } = req.params;

    const getCourse = await CourseEntity.findOne({
      where: { id },
    });

    const updateCourseInfo = CourseEntity.merge(getCourse, {
      level,
      courseUnit,
      courseCode,
      courseName,
    });

    return res.status(HTTP.OK).json({
      message: "course updated successfully!",
      data: updateCourseInfo,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update course`,
      status: HTTP.BAD_REQUEST,
      name: "Course update Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;

    const getCourse = await CourseEntity.delete({
      id,
    });

    return res.status(HTTP.OK).json({
      message: "Course deleted successfully!",
      data: getCourse,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to delete course`,
      status: HTTP.BAD_REQUEST,
      name: "Course delete Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
