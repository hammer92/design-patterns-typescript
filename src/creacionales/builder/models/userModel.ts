import Joi, { valid } from "joi";

const validName = Joi.string();
const validEmail = Joi.string().empty("").default("default value");

const userSchema = Joi.object({
  name: validName,
  email: validEmail,
});

export interface User {
  name: string;
  email: string;
  errors?: string[];
}

export class UserBuilder {
  private _user: User;

  constructor() {
    this._user = {
      name: "",
      email: "",
    };
  }

  name(name: string): UserBuilder {
    this._user.name = name;
    return this;
  }

  email(email: string): UserBuilder {
    this._user.email = email;
    return this;
  }

  build(): Readonly<User> {
    const { error, value } = userSchema.validate(this._user);

    if (Joi.isError(error)) {
      value.errors = error.details.map(({ message }) => message);
    }
    return value;
  }
}
