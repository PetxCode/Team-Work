import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import { mainRoles } from "../../utils/constants/roles";
import { OfficeEntity } from "./OfficeEntity";

@Entity("AssignRoleEntity")
export class AssignRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column("enum", { enum: mainRoles.roles })
  role: string;

  @ManyToOne(() => OfficeEntity, (role) => role.role)
  office: OfficeEntity[];
}
