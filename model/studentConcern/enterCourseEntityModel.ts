import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";

import { RegisterEntity } from "./registerCourse";

@Entity("EnterCourseEntities")
export class EnterCourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  courseName: string;

  @Column()
  courseCode: string;

  @Column()
  courseUnit: number;

  @Column()
  level: string;

  @Column()
  semester: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => RegisterEntity, (el) => el.course)
  @JoinColumn()
  course: RegisterEntity[];
}
