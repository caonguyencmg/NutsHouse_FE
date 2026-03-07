import axios from "../axios";

const getAllUsers = (inputId, searchText) => {
  return axios.get(`/api/get-user?id=${inputId}`, { params: { searchText } });
};

const getAllBills = (searchText, status, billsCode) => {
  return axios.get("/api/get-bill", {
    params: { searchText, status, billsCode },
  });
};

const userLogin = (data) => {
  return axios.post("/api/login", {
    userName: data.userName,
    password: data.password,
  });
};
const createBill = (data) => {
  return axios.post("/api/create-bill", data);
};
const deleteBill = (id) => {
  return axios.put("/api/delete-bill", id);
};
//destroy
// const deleteBill = (id) => {
//   return axios.delete("/api/delete-bill", id );
// };
const editBill = (data) => {
  return axios.put("/api/edit-bill", data);
};

export {
  getAllUsers,
  createBill,
  deleteBill,
  editBill,
  userLogin,
  getAllBills,
};
