import { Service } from "./Service";

class LoginServices extends Service {
  signIn = (userLogin) => {
    return this.post("users/login", userLogin);
  };

  signUp = (userRegister) => {
    return this.post("users/register", userRegister);
  };
}

export const loginServices = new LoginServices();
