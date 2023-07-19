import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { SchoolEntity } from "../AdminEntity/SchoolEntity";
import { CourseEntity } from "../AdminEntity/courseEntity";

@Entity("StaffEntity")
export class StaffEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  office: string;

  // @Column({ nullable: true })
  // assignCourse: Array<any>;

  @OneToMany(() => CourseEntity, (el) => el.course)
  course: CourseEntity[];

  @ManyToOne(() => SchoolEntity, (role) => role.staff)
  school: SchoolEntity;
}
