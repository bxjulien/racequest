export type JwtUser = {
  id: string;
  email: string;
};

export interface RequestWithUser extends Request {
  user: JwtUser;
}
