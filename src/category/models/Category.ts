import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
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
  @Column()
  @JoinColumn()
  name!: String;

  @Field()
  @ManyToOne(() => User, (user) => user.categories, {
    eager: true,
    nullable: false,
  })
  owner!: User;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, (recipe) => recipe.category, {
    lazy: true,
  })
  @JoinColumn({ name: 'recipe_id' })
  recipes?: Recipe[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
