import { Field, ObjectType } from "type-graphql";
import { BaseResponse } from "../../shared/responses/BaseResponse";

@ObjectType()
export class LoginResponse extends BaseResponse {
  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  expiration?: number;

}
