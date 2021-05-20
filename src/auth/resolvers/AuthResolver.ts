import * as bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { User } from "../../user/models/User";
import { LoginInput } from "../inputs/LoginInput";
import { Context } from "../../utils";
import { UserPayload } from "../../user/payloads/UserPayload";
import { RegisterInput } from "../inputs/RegisterInput";
import { LoginPayload } from "../payloads/LoginPayload";
import { AuthenticationError } from "apollo-server-express";
import { Service } from "typedi";
import AuthService from "../service/AuthService";
import { decodeToken, generateToken } from "../utils/jwt";
import { tokenObject } from "../types/tokenObject";

@Service()
@Resolver()
export class AuthenticationResolver {
  
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserPayload)
  async register(@Arg("input") { name, email, password }: RegisterInput) {
    return this.authService.signUp(name, email, password);
  }

  @Mutation(() => LoginPayload)
  async login(
    @Arg("input", { nullable: false }) input: LoginInput
  ): Promise<LoginPayload> {
    const { email, password } = input;
    const user: User = (await User.findOne({ email })) as User;

    if (!user) {
      return new AuthenticationError("User does not exist.");
    }

    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return new AuthenticationError("Incorrect password.");
    }

    const tokenObject: tokenObject = generateToken(user);
    return {
      message: "Login Success",
      ...tokenObject
    };
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  async me(@Ctx() context: Context): Promise<User | undefined> {
    const user: User = decodeToken(context.token as string).user;
    return user;
  }

  // @Mutation(() => Boolean)
  // async logout(@Ctx() context: Context): Promise<Boolean> {
  //   return new Promise((res, rej) =>
  //     context.req.body.session!.destroy((err: any) => {
  //       if (err) {
  //         console.log(err);
  //         return rej(false);
  //       }

  //       context.res.clearCookie("qid");
  //       return res(true);
  //     })
  //   );
  // }
}
