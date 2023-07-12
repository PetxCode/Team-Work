import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { mainAppErrorHandler } from "./utils/error/errorDefiner";
import { errorHandler } from "./utils/error/errorHandlers";
import { HTTP } from "./utils/constants/HTTP";
import user from "./routers/UserRoutes";
import cookieSession from "cookie-session";
import passport from "passport";
import social from "./routers/oAuthRoute";
import role from "./routers/roleRouter";
import level from "./routers/levelRouter";
import student from "./routers/studentRegistrationRouter";
import course from "./routers/student/courseRoute";
import register from "./routers/student/registerCourseRouter";

import myRegister from "./routers/student/createCourseRouter";

export const mainApp = (app: Application) => {
  app
    .use(express.json())
    .use(cors())

    .use(
      cookieSession({
        name: `${process.env.SESSION_NAME}`,
        keys: [`${process.env.SESSION_KEY}`],
        maxAge: 2 * 60 * 60 * 100,
      }),
    )

    .use(function (req: any, res: Response, next: NextFunction) {
      if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
          cb();
        };
      }
      if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
          cb();
        };
      }
      next();
    })
    .use(passport.initialize())
    .use(passport.session())

    // custom auth
    .use("/api/user", user)
    .use("/api/role", role)
    .use("/api/level", level)
    .use("/api/student", student)
    .use("/api/course", course)
    .use("/api/register-course", register)
    .use("/api/my-register", myRegister)

    //oAuth with google
    .use("/", social)

    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainAppErrorHandler({
          message: `This route ${req.originalUrl} doesn't exist`,
          status: HTTP.NOT_FOUND,
          name: "Route Error",
          isSuccess: false,
        }),
      );
    })

    .use(errorHandler);
};
