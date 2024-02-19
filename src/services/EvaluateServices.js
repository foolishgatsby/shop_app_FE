import { Service } from "./Service";

class EvaluateServices extends Service {
  getEvaluatesByProduct = (product_id) => {
    return this.get(`evaluates/product/${product_id}`);
  };

  postEvaluate = (evaluateInfo) => {
    return this.post(`evaluates/create`, evaluateInfo);
  };

  getAllEvaluate = () => {
    return this.get(`evaluates/getAll`);
  };

  deleteEvaluate = (evaluate_id) => {
    return this.delete(`evaluates/${evaluate_id}`);
  };
}

export const evaluateService = new EvaluateServices();
