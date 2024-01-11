import { Service } from "./Service";

class LoginServices extends Service {
  signIn = (userLogin) => {
    return this.post("", userLogin);
  };
}

export const loginServices = new LoginServices();
