import { auth } from "../../auth";

export const isAuth = async () => {
  const session = await auth();
  if (session?.user) return true;
  else return false;
};

export const authDetails = async () => {
  const session = await auth();
  return session
};
