import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: String;

  @Field()
  @Column()
  email!: String;

  @Field(() => String)
  @Column({ nullable: false })
  password!: string;
}
