import { IsDefined, IsString, MinLength } from "class-validator";

export class RequestResetPasswordDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  oldPassword: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class CheckResetPasswordDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  code: string;
}
