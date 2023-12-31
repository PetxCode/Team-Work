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
  ManyToMany,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
import { CourseEntity } from "./courseEntity";
import { RegisterEntity } from "../studentConcern/registerCourse";
import { SchoolEntity } from "./SchoolEntity";

@Entity("studentEntities")
export class studentEntity extends BaseEntity {
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

  // @ManyToOne(() => SchoolEntity, (school) => school.student)
  // @JoinColumn()
  // school: SchoolEntity;

  // @ManyToMany(() => UserEntity, (course) => course.student)
  // @JoinColumn()
  // course: UserEntity[];

  @OneToMany(() => RegisterEntity, (el) => el.register)
  @JoinColumn()
  register: RegisterEntity[];

  @ManyToOne(() => SchoolEntity, (el) => el.student)
  @JoinColumn()
  school: SchoolEntity;
}
