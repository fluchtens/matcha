import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class SignUpDto {
  @IsNotEmpty({ message: "Username cannot be empty." })
  @IsString({ message: "Username must be a string." })
  @Length(3, 16, {
    message: "Username must be between 3 and 16 characters long.",
  })
  @Matches(/^[a-zA-Z0-9\-_]+$/, {
    message: "Username can only contain letters, digits, underscores & hyphens.",
  })
  username: string;

  @IsNotEmpty({ message: "Email cannot be empty." })
  @IsString({ message: "Email must be a string." })
  @IsEmail({}, { message: "Invalid email format." })
  email: string;

  @IsNotEmpty({ message: "First name cannot be empty." })
  @IsString({ message: "First name must be a string." })
  @Length(3, 50, {
    message: "First name must be between 3 and 50 characters long.",
  })
  firstName: string;

  @IsNotEmpty({ message: "Last name cannot be empty." })
  @IsString({ message: "Last name must be a string." })
  @Length(3, 50, {
    message: "Last name must be between 3 and 50 characters long.",
  })
  lastName: string;

  @IsNotEmpty({ message: "Password cannot be empty." })
  @IsString({ message: "Password must be a string." })
  @Length(8, 30, {
    message: "Password must be between 8 and 30 characters long.",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: "Username cannot be empty." })
  @IsString({ message: "Username must be a string." })
  username: string;

  @IsNotEmpty({ message: "Password cannot be empty." })
  @IsString({ message: "Password must be a string." })
  password: string;
}
