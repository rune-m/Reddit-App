import { IUserToken } from "../types/types";

export const userIdPath = (user: IUserToken): string => {
  if (user !== null) {
    return `/${user.id}`;
  }
  return "";
};
