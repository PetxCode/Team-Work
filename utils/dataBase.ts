import { DataSource } from "typeorm";
import "reflect-metadata";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { OfficeEntity } from "../model/AdminEntity/OfficeEntity";
import { AssignRoleEntity } from "../model/AdminEntity/AssignRoleEntity";
import { studentEntity } from "../model/AdminEntity/studentEntity";
import { CourseEntity } from "../model/AdminEntity/courseEntity";
import { LevelEntity } from "../model/studentConcern/LevelEntity";
import { EnterCourseEntity } from "../model/studentConcern/enterCourseEntityModel";
import { OrganisationEntity } from "../model/AdminEntity/OrganisationEntity";
import { SchoolEntity } from "../model/AdminEntity/SchoolEntity";
import { myStudentEntity } from "../model/AdminEntity/myStudentEntity";
import { CreateLevelEntity } from "../model/AdminEntity/CreateLevelEntity";
import { RegisterCourseEntity } from "../model/AdminEntity/registerCourse";
import { RegisterEntity } from "../model/studentConcern/registerCourse";
import { StaffEntity } from "../model/staff/staffEntity";


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
    CourseEntity,
    // RegisterCourseEntity,
    RegisterEntity,
StaffEntity,
    EnterCourseEntity,

    CreateLevelEntity,
    OrganisationEntity,
    SchoolEntity,
    myStudentEntity,
  ],
});

// new Client({
//   types: ,
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "Petxcanadi@2020",
//   database: "office",
//   synchronize: true,
//   logging: false,
// });


// vzBxFhBF6vu8Cqyy28pRNw;

