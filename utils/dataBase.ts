import { DataSource } from "typeorm";
import "reflect-metadata";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { OfficeEntity } from "../model/AdminEntity/OfficeEntity";
import { AssignRoleEntity } from "../model/AdminEntity/AssignRoleEntity";
import { studentEntity } from "../model/AdminEntity/studentEntity";
import { CourseEntity } from "../model/AdminEntity/courseEntity";
import { LevelEntity } from "../model/studentConcern/LevelEntity";
import { RegisterEntity } from "../model/studentConcern/registerCourse";
import { EnterCourseEntity } from "../model/studentConcern/enterCourseEntityModel";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Petxcanadi@2020",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    OfficeEntity,
    AssignRoleEntity,
    LevelEntity,
    studentEntity,
    CourseEntity,
    RegisterEntity,
    EnterCourseEntity,
  ],
});


