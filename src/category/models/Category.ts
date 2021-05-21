import { Field, ID, ObjectType } from "type-graphql";
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.categories, {
    eager: true,
    nullable: false,
  })
  owner!: User;

  @Field(() => [Recipe], { nullable: true })
  @OneToMany(() => Recipe, (recipe) => recipe.category, {
    lazy: true,
  })
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
