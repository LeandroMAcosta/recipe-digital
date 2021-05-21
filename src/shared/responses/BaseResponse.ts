import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BaseResponse {
  @Field()
  message?: string;

  @Field()
  status?: number;
}
