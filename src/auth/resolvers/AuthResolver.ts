import * as bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { User } from "../../user/models/User";
import { LoginInput } from "../inputs/LoginInput";
import { Context } from "../../utils";
import { UserPayload } from "../../user/payloads/UserPayload";
import { RegisterInput } from "../inputs/RegisterInput";
import { LoginPayload } from "../payloads/LoginPayload";
import { sign } from "../utils/jwt";
import { ApolloError, AuthenticationError } from "apollo-server-express";

@Resolver()
export class AuthenticationResolver {
  @Mutation(() => UserPayload)
  async register(@Arg("input") { name, email, password }: RegisterInput) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new ApolloError("Email already in use.");
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    return { user };
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
    const token = sign(user);
    return {
      message: "Login Success",
      token: token,
    };
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  async me(@Ctx() context: Context): Promise<User | undefined> {
    console.log(context.req.user);
    return User.findOne(1);
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
