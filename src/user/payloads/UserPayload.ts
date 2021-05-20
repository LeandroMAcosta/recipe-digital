import { Field, ObjectType } from "type-graphql";
import { User } from "../models/User";

@ObjectType()
export class UserPayload {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  expiration?: number;

  @Field({ nullable: true })
  message?: string;

}
