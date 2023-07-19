import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
// import { RoleEntity } from "./OfficeEntity";





@Entity("OrganisationEntities")
export class OrganisationEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  title: string;

  // @OneToMany(() => UserEntity, (el) => el.organisation)
  // @JoinColumn()
  // user: UserEntity[];
}















// @Entity("UserEntities")
// export class UserEntity extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid")
//   id: string | number;

//   @Column()
//   userName: string;

//   @Column({
//     unique: true,
//   })
//   email: string;

//   @Column({
//     nullable: true,
//   })
//   password: string;

//   @Column()
//   token: string;

//   @Column()
//   verified: boolean;

//   // @OneToMany(() => RoleEntity, (role) => role.user)
//   // role: RoleEntity[];
// }
