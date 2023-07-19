import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import "reflect-metadata";
import { studentEntity } from "./studentEntity";
import { UserEntity } from "./UserEntity";
import { SchoolEntity } from "./SchoolEntity";
import { StaffEntity } from "../staff/staffEntity";
// import { AssignRoleEntity } from "./AssignRoleEntity";

@Entity("CourseEntities")
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column({
    unique: true,
  })
  courseName: string;

  @Column({
    unique: true,
  })
  courseCode: string;

  @Column()
  courseUnit: number;

  @Column()
  level: string;

  @Column()
  semester: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.course)
  @JoinColumn()
  course: SchoolEntity;

  @ManyToOne(() => StaffEntity, (el) => el.course)
  @JoinColumn()
  staff: StaffEntity;

  // Course Registered
}
