import { IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {

  @Field()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
  
}