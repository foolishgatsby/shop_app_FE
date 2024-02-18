import { TOKEN } from "../util/constants/settingSystem";
import { Service } from "./Service";

class AdminServices extends Service {
  getAllAccount = () => {
    return this.get("users/all");
  };

  editAccount = (editAccount) => {
    return this.put(`users/updateForAdmin/${editAccount.id}`, editAccount);
  };

  getUserDetail = () => {
    return this.post(`users/details`);
  };

  editProfile = (userDetail) => {
    return this.put(`users/details/${userDetail.id}`, userDetail);
  };
}

export const adminServices = new AdminServices();
