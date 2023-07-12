import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import "reflect-metadata";
// import { RoleEntity } from "./OfficeEntity";

@Entity("UserEntities")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  token: string;

  @Column()
  verified: boolean;

  // @OneToMany(() => RoleEntity, (role) => role.user)
  // role: RoleEntity[];
}
