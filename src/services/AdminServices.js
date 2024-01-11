import { Service } from "./Service";

class AdminServices extends Service {
  getProductByCategory = (categoryId) => {
    return this.get(``);
  };
}

export const adminServices = new AdminServices();
