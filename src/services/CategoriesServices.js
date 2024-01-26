import { Service } from "./Service";

class CategoriesServices extends Service {
  getAllCategories = () => {
    return this.get("categories/getAll");
  };

  deleteCategory = (id) => {
    return this.delete(`categories/${id}`);
  };

  addCategory = (model) => {
    return this.post(`categories`, model);
  };

  editCategory = (id, model) => {
    return this.put(`categories/${id}`, model);
  };
}

export const categoriesServices = new CategoriesServices();
