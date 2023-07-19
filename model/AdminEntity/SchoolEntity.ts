import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
import { studentEntity } from "./studentEntity";
import { myStudentEntity } from "./myStudentEntity";
import { LevelEntity } from "../studentConcern/LevelEntity";
import { CreateLevelEntity } from "./CreateLevelEntity";
import { CourseEntity } from "./courseEntity";
import { StaffEntity } from "../staff/staffEntity";

@Entity("SchoolEntities")
export class SchoolEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number | null;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => UserEntity, (school) => school.mySchool)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => myStudentEntity, (el) => el.school, { cascade: true })
  @JoinColumn()
  student: myStudentEntity[];

  @OneToMany(() => CreateLevelEntity, (el) => el.schoolLevels, {
    cascade: true,
  })
  @JoinColumn()
  schoolLevels: CreateLevelEntity[];

  @OneToMany(() => CourseEntity, (el) => el.course, { cascade: true })
  @JoinColumn()
  course: CourseEntity[];

  @OneToMany(() => StaffEntity, (el) => el.school, { cascade: true })
  @JoinColumn()
  staff: StaffEntity[];
}
