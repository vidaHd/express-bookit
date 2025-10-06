import { IsDefined } from "class-validator";

export class LoginUserDto {
  @IsDefined()
  name: string;
  @IsDefined()
  password: string;
  @IsDefined()
  familyName: string;
  @IsDefined()
  mobileNumber: string;
}
