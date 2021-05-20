import { Arg, Ctx, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { User } from "../../user/models/User";
import { LoginInput } from "../inputs/LoginInput";
import { Context } from "../../utils";
import { RegisterPayload as RegisterPayload } from "../payloads/RegisterPayload";
import { RegisterInput } from "../inputs/RegisterInput";
import { LoginPayload } from "../payloads/LoginPayload";
import { Service } from "typedi";
import AuthService from "../service/AuthService";
import { tokenPayload } from "../types/tokenPayload";
import { decodeToken } from "../utils/jwt";

@Service()
@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterPayload)
  register(@Arg("input") { name, email, password }: RegisterInput) {
    return this.authService.signUp(name, email, password);
  }

  @Mutation(() => LoginPayload)
  login(@Arg("input", { nullable: false }) { email, password }: LoginInput) {
    return this.authService.signIn(email, password);
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  me(@Ctx() context: Context): User {
    const tokenPayload: tokenPayload = decodeToken(context.token as string);
    return tokenPayload.user;
  }
}
