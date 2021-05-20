import * as bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { User } from "../../user/models/User";
import { LoginInput } from "../models/inputs/LoginInput";
import { Context } from "../../utils/context";
import { UserResponse } from "../../user/models/inputs/UserResponse";
import { RegisterInput } from "../models/inputs/RegisterInput";
import { LoginResponse } from "../types/LoginResponse";
import { sign } from "../utils/jwt";

const invalidLoginResponse = {
  errors: [
    {
      path: "email",
      message: "invalid login",
    },
  ],
};

@Resolver()
export class AuthenticationResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input")
    { name, email, password }: RegisterInput
  ) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        errors: [
          {
            path: "email",
            message: "already in use",
          },
        ],
      };
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("input", { nullable: false }) input: LoginInput
  ): Promise<LoginResponse> {
    const { email, password } = input;
    const user: User = await User.findOne({ email }) as User;
    console.log(user);

    if (!user) {
      return {
        message: "Invalid username",
        status: 0,
      };
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return {
        message: "Incorrect ppassword",
        status: 0,
      };
    }
    const token = sign(user);
    return {
      message: "Login Success",
      status: 1,
      token: token,
    };
  }

  // @Mutation(() => UserResponse)
  // async login(
  //   @Arg("input") { email, password }: LoginInput,
  //   @Ctx() context: Context
  // ) {
  //   const user = await User.findOne({ where: { email } });

  //   if (!user) {
  //     return invalidLoginResponse;
  //   }

  //   const valid = await bcrypt.compare(password, user.password);

  //   if (!valid) {
  //     return invalidLoginResponse;
  //   }

  //   context.req.body.session!.userId = user.id;

  //   const token = jwt

  //   return { user };
  // }

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
