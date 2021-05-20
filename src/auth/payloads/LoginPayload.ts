import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginPayload {

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  expiration?: number;

  @Field({ nullable: true })
  message!: string;

}