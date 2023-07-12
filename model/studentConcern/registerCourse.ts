import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { studentEntity } from "../AdminEntity/studentEntity";
import { EnterCourseEntity } from "./enterCourseEntityModel";

@Entity("RegisterEntities")
export class RegisterEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  registerTitle: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => studentEntity, (el) => el.register)
  @JoinColumn()
  register: studentEntity;

  @OneToMany(() => EnterCourseEntity, (el) => el.course)
  @JoinColumn()
  course: EnterCourseEntity[];
}
