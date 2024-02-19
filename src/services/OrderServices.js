import { Service } from "./Service";

class OrderServices extends Service {
  order = (orderInfo) => {
    return this.post(`orders`, orderInfo);
  };

  getAllOrder = () => {
    return this.get(`orders/get-orders-by-keyword-not-paging`);
  };

  deleteOrder = (order_id) => {
    return this.delete(`orders/${order_id}`);
  };

  getOrderDetailByID = (order_id) => {
    return this.get(`orders/${order_id}`);
  };

  editOrderDetail = (editOrder) => {
    return this.put(`orders/${editOrder.id}`, editOrder);
  };
}

export const orderServices = new OrderServices();
