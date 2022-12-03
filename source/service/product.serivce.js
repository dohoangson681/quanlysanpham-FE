import { http } from "../config/config.js";
export default class ProductService {
    getProducList = () => {
        return http.get('/products') ; 
    }
    getProductDetail = (id) => {
        return http.get(`/products/${id}`) ;
    }
    addNewProduct = (newProduct) => {
        return http.post(`/products`,newProduct) ; 
    }
    updateProduct = (id , dataUpdate) => {
        return http.put(`/products/${id}`,dataUpdate) ;
    }
    deleteProduct = (id) => {
        return http.delete(`/products/${id}`) ; 
    }
}