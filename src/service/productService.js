import axios from "../axios";

const getListProduct = (status) => {
  return axios.get("/product/get-list", { params: { status } });
};

const editProduct = (data) => {
  return axios.put("/product/edit-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export { getListProduct, editProduct };
