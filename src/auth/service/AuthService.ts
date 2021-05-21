import * as bcrypt from "bcrypt";
import { Service } from "typedi";
import { AuthenticationError, UserInputError } from "apollo-server-express";
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

  async signUp(name: string, email: string, password: string) {
    const existingUser: User | undefined = await this.userRepository.findOne({
      email,
    });

    if (existingUser) {
      throw new UserInputError("Email already in use.");
    }

    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser: User = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const tokenObject: tokenObject = generateToken(newUser);
    return { user: newUser, ...tokenObject };
  }

  async signIn(email: string, password: string) {
    const user: User | undefined = await this.userRepository.findOne({ email });
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
      ...tokenObject,
    };
  }
}
