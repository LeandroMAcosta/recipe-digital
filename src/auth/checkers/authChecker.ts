import { AuthChecker } from "type-graphql";
import { isExpired } from "../../utils";
import { Context } from "../../utils/context";
import { decodeToken } from "../utils/jwt";

const authChecker: AuthChecker = ({ context }): boolean => {
  const { token } = context as Context;
  const { exp } = decodeToken(token!);
  return isExpired(exp);
};

export default authChecker;
