import { Service } from "./Service";

class ProductServices extends Service {
  getNewProduct = () => {
    return this.get(`products/all?page=1&limit=10`);
  };

  /**
   * get product by categry
   * method: get
   * url: http://localhost:1702/api/v1/products/getAll
   */
  getProductByCategory = (category_id) => {
    return this.get(`products/category/${category_id}`);
  };

  /**
   * get product by ID
    method: get,
    url: http://localhost:1702/api/v1/products/${id}
    get product by id
   */
  getProductById = (id) => {
    return this.get(`products/${id}`);
  };

  /**
   * get product img
   * method: get
   * url: http://localhost:1702/api/v1/products/images/2c0fd7d3-1c1d-4fe7-b6cb-49e31b6f7ba7_macbooktest1.jpg
   */

  /**
   * delete product
   * method: del
   * url: http://localhost:1702/api/v1/products/${product_id}
   */
  deleteProduct = (id) => {
    return this.delete(`products/${id}`);
  };

  /**
   * add product
   * 27/01/2024
   * method: post
   * url: http://localhost:1702/api/v1/products
   * model: {
   * "name": "Corsair Mouse Test",
   * "price": 2299.95,
   * "description": "Corsair Mouse",
   * "category_id": 3
   * }
   */
  addProduct = (newProduct) => {
    return this.post(`products`, newProduct);
  };

  /**
   * update product
   * method: put
   * url: http://localhost:1702/api/v1/products/${id}
   * model: {
   * "name": "Asus ROG Zenphyrus M16",
    "price": 1600.00,
    "description": "Zenphyrus ROG Gaming Laptop",
    "category_id": 7
   * }
   */
  editProduct = (id, editProduct) => {
    return this.put(`products/${id}`, editProduct);
  };

  /**
   * post img
   */

  // search product by category_id and keyword
  searchProduct = (searchInfo) => {
    const { category_id, keyword } = searchInfo;
    return this.get(
      `products/findByName?keyword=${keyword}&category_id=${category_id}`
    );
  };
}

export const productServices = new ProductServices();
