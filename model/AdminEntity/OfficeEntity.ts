import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
import { AssignRoleEntity } from "./AssignRoleEntity";

@Entity("OfficeEntity")
export class OfficeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => UserEntity, (role) => role.office)
  user: UserEntity;

  @OneToMany(() => AssignRoleEntity, (role) => role.office)
  role: AssignRoleEntity[];
}
