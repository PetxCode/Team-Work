import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import { UserEntity } from "../AdminEntity/UserEntity";

@Entity("LevelEntities")
export class LevelEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  levelTitle: string;

  @ManyToOne(() => UserEntity, (el) => el.schoolLevels)
  @JoinColumn()
  schoolLevels: UserEntity;
}
