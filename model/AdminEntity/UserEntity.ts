import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import "reflect-metadata";
import { OfficeEntity } from "./OfficeEntity";
import { studentEntity } from "./studentEntity";
import { CourseEntity } from "./courseEntity";
import { RegisterEntity } from "../studentConcern/registerCourse";
import { LevelEntity } from "../studentConcern/LevelEntity";
import { OrganisationEntity } from "./OrganisationEntity";
import { SchoolEntity } from "./SchoolEntity";
// import { AssignRoleEntity } from "./AssignRoleEntity";

@Entity("UserEntities")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column({
    // unique: true,
    nullable: true,
  })
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    // unique: true,
    nullable: true,
  })
  password: string;

  @Column()
  token: string;

  @Column()
  verified: boolean;

  // @OneToOne(() => OfficeEntity, (role) => role.user)
  // @JoinColumn()
  // office: OfficeEntity;

  // @OneToMany(() => studentEntity, (el) => el.mySchool, { cascade: true })
  // @JoinColumn()
  // student: studentEntity[];

  // @OneToMany(() => CourseEntity, (el) => el.course, { cascade: true })
  // @JoinColumn()
  // course: CourseEntity[];

  // @OneToMany(() => LevelEntity, (el) => el.schoolLevels, { cascade: true })
  // @JoinColumn()
  // schoolLevels: LevelEntity[];

  // @OneToMany(() => OrganisationEntity, (el) => el.user, {
  //   cascade: true,
  // })
  // @JoinColumn()
  // organisation: OrganisationEntity[];

  @OneToMany(() => SchoolEntity, (el) => el.user, { cascade: true })
  @JoinColumn()
  mySchool: SchoolEntity[];
}
