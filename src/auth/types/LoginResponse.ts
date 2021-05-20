import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  message!: string;
  
  @Field({ nullable: true })
  token?: string;
  
  @Field()
  status!: number;
}