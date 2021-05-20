import * as bcrypt from "bcrypt";
import { Service } from "typedi";
import { ApolloError } from "apollo-server-express";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../user/models/User";
import { tokenObject } from "../types/tokenObject";
import { generateToken } from "../utils/jwt";

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async signUp(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      return new ApolloError("Email already in use.");
    }

    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    const tokenObject: tokenObject = generateToken(newUser);

    return { user: newUser, ...tokenObject };
  }

  // public async SignIn(
  //   email: string,
  //   password: string
  // ): Promise<{ user: User; token: string }> {
  //   const record = await this.userRepository.findOne({ email });
  //   if (!record) {
  //     throw new Exception("User not found!", 404);
  //   }
  //   /**
  //    * We use verify from argon2 to prevent 'timing based' attacks
  //    */
  //   const validPassword = await argon2.verify(record.password, password);
  //   if (validPassword) {
  //     const token = this.generateToken(record);
  //     const user = record;
  //     Reflect.deleteProperty(user, "password");
  //     Reflect.deleteProperty(user, "salt");
  //     /**
  //      * Return user and token
  //      */
  //     return { user, token };
  //   } else {
  //     throw new Error("Invalid Password");
  //   }
  // }
}
