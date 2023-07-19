import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import { SchoolEntity } from "./SchoolEntity";
import { RegisterEntity } from "../studentConcern/registerCourse";
import { RegisterCourseEntity } from "./registerCourse";

@Entity("myStudentEntities")
export class myStudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number | null;

  @Column({ nullable: true })
  fullName: string;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: true,
  })
  level: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  schoolName: string;

  @Column()
  verified: boolean;

  @ManyToOne(() => SchoolEntity, (el) => el.student)
  @JoinColumn()
  school: SchoolEntity;

  @OneToMany(() => RegisterEntity, (el) => el.register)
  @JoinColumn()
  register: RegisterEntity[];
}
