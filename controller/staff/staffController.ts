import { Request, Response } from "express";
import { SchoolEntity } from "../../model/AdminEntity/SchoolEntity";
import { HTTP } from "../../utils/constants/HTTP";
import { mainAppErrorHandler } from "../../utils/error/errorDefiner";
import { StaffEntity } from "../../model/staff/staffEntity";
import { mainRoles } from "../../utils/constants/roles";
import { CourseEntity } from "../../model/AdminEntity/courseEntity";

export const createStaff = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;
    const { fullName, status, office } = req.body;

    const user = await SchoolEntity.findOne({
      where: { id: schoolID },
      relations: ["staff"],
    });

    if (!user) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: `Error isn't recorded`,
      });
    }

    const registerStaff = await StaffEntity.create({
      fullName,
      status,
      office,
    });

    user.staff = [...user.staff, registerStaff];
    user.save();

    return res.status(HTTP.OK).json({
      message: "staff successfully created",
      data: registerStaff,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to School staff`,
      status: HTTP.BAD_REQUEST,
      name: "staff creation Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const viewRegisterStaff = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { schoolID } = req.params;

    const school = await SchoolEntity.findOne({
      where: {
        id: schoolID,
      },
      relations: ["student", "course", "schoolLevels", "staff"],
    });

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

// export const viewAllSchool = async (
//   req: Request,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const school = await SchoolEntity.find();

//     // if (!user) {
//     //   return res.status(HTTP.BAD_REQUEST).json({
//     //     message: `Error isn't recorded`,
//     //   });
//     // }

//     return res.status(HTTP.OK).json({
//       message: "school successfully viewed",
//       data: school,
//     });
//   } catch (err) {
//     new mainAppErrorHandler({
//       message: `Unable to create School`,
//       status: HTTP.BAD_REQUEST,
//       name: "School creation Error",
//       isSuccess: false,
//     });

//     return res.status(HTTP.BAD_REQUEST).json({
//       message: "Error Found",
//       data: err,
//     });
//   }
// };

export const updateStaffInfo = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { staffID } = req.params;
    const { fullName } = req.body;
    const staff = await StaffEntity.findOne({ where: { id: staffID } });
    const updateStaff = await StaffEntity.merge(staff, { fullName }).save();

    return res.status(HTTP.OK).json({
      message: "update  staff info successfully",
      data: updateStaff,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update Staff Info`,
      status: HTTP.BAD_REQUEST,
      name: "update Staff Info Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const updateStaffInfoByAdmin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { staffID, schoolID } = req.params;
    const { status, office } = req.body;

    const staff = await StaffEntity.findOne({ where: { id: staffID } });
    const school = await SchoolEntity.findOne({ where: { id: schoolID } });

    if (!school) {
      return res.status(HTTP.BAD_REQUEST).json({ message: "Error...!" });
    }
    const updateStaff = await StaffEntity.merge(staff, {
      status,
      office,
    }).save();

    return res.status(HTTP.OK).json({
      message: "update  staff info successfully",
      data: updateStaff,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update Staff Info`,
      status: HTTP.BAD_REQUEST,
      name: "update Staff Info Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const deleteStaff = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { staffID } = req.params;

    const getSchool = await StaffEntity.delete({ id: staffID });

    return res.status(HTTP.OK).json({
      message: "staff successfully deleted",
      data: getSchool,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to delete Staff`,
      status: HTTP.BAD_REQUEST,
      name: "staff delete Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};

export const updateStaffCourseByAdmin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { staffID, schoolID } = req.params;
    const { course, assignCourse } = req.body;

    const staff: any = await StaffEntity.findOne({
      where: { id: staffID },
      relations: ["course"],
    });
    const school = await SchoolEntity.findOne({ where: { id: schoolID } });

    const checkCourse = await CourseEntity.findOne({
      where: { courseCode: course },
    });

    console.log(course);
    console.log(checkCourse);
    const courseData = checkCourse;

    if (!checkCourse && !school) {
      return res.status(HTTP.BAD_REQUEST).json({ message: "Error...!" });
    }

    const updateStaff = await StaffEntity.merge(staff, {
      course: [courseData!],
    }).save();

    // const updateStaff = await StaffEntity.merge(staff, {
    //   assignCourse: courseData!,
    // }).save();

    return res.status(HTTP.OK).json({
      message: "update staff info successfully",
      data: updateStaff,
    });
  } catch (err) {
    new mainAppErrorHandler({
      message: `Unable to update Staff Info`,
      status: HTTP.BAD_REQUEST,
      name: "update Staff Info Error",
      isSuccess: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error Found",
      data: err,
    });
  }
};
