import axios from "../axios";

const getListProduct = () => {
  return axios.get("/product/get-list");
};

export { getListProduct };
