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
import { SchoolEntity } from "../AdminEntity/SchoolEntity";

@Entity("LevelEntities")
export class LevelEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @Column()
  levelTitle: string;

  @ManyToOne(() => SchoolEntity, (el) => el.schoolLevels)
  @JoinColumn()
  schoolLevels: SchoolEntity;
}
