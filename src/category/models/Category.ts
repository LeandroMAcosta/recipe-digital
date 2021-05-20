import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Recipe } from "../../recipe/models/Recipe";
import { User } from "../../user/models/User";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.categories)
  owner!: User;

  @OneToMany(() => Recipe, recipe => recipe.category)
  recipes?: Recipe[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column()
  name!: String;
}
