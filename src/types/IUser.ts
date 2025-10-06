
export interface IUser extends Document {
  name: string;
  password: string;
  familyName: string;
  mobileNumber: string;
  profile?: {
    age?: number;
    avatar?: string;
    gender?: string;
    description?: string;
  };
  resetCode?: string;
  newPasswordTemp?: string;
}
