export type UserFormFields = {
  email: string;
  password: string;
};

export interface UserData {
  userId?: string | null;
  email?: string;
  token?: string;
}
