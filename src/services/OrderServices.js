import { Service } from "./Service";

class OrderServices extends Service {
  order = (orderInfo) => {
    return this.post(`orders`, orderInfo);
  };
}

export const orderServices = new OrderServices();
