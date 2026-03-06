import React, { useEffect, useState } from "react";
import Header from "../../component/layout/Header";
import { formatYMDToDMY, number_to_price } from "../../helper/common";
import { deleteBill, getAllBills } from "../../service/userService";
import { getListProduct } from "../../service/productService";
import DeletePopup from "../../component/layout/deletePopup";
import { toast } from "react-toastify";
import UpdateBill from "../updateBill";
import { Input } from "antd";

const Admin = () => {
  const [arrBill, setArrBill] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();
  const [billDetail, setBillDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [select, setSelect] = useState("");

  const getListBills = async (searchText, status) => {
    let response = await getAllBills(searchText, status);
    if (response && response.status === 200) {
      setArrBill(response.bills);
    }
  };

  const getListProducts = async () => {
    let response = await getListProduct();
    if (response && response.statusCode === 200) {
      const products = response.products;
      setListProducts(products);
    }
  };

  const handleMapProducts = (productIds) => {
    let arrProducts = JSON.parse(productIds);
    const productsDetail = arrProducts.map((item) => {
      const name = listProducts.find((p) => p.id === item.productId)?.name;

      return {
        ...item,
        name: name ? name : "",
      };
    });
    let products = productsDetail.map(
      (item) => item.quantity + " " + item.name,
    );
    return products.join(", ");
  };

  const handleDeleteUser = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleAgreeDelete = async () => {
    let response = await deleteBill({ id: deleteProductId });
    if (response && response.status === 200) {
      toast.success("Xoá đơn hàng thành công!", {
        autoClose: 300,
      });
      getListBills();
      setShowDeleteModal(false);
      setDeleteProductId(undefined);
    }
  };

  const handleUpdateBill = (bill) => {
    let copyBill = { ...bill, listProducts: handleMapProducts(bill.productId) };
    setBillDetail(copyBill);
    setShowModal(true);
  };

  useEffect(() => {
    getListProducts();
    getListBills();
  }, []);

  return (
    <div>
      <Header></Header>

      <h1 className="flex items-center justify-center mt-[106px] mb-3 text-3xl">
        Danh sách Đơn hàng
      </h1>
      <div className="flex gap-6 justify-end px-6">
        <div>
          <select
            name="status"
            id="status"
            className="w-full min-w-[180px] h-11 bg-[#e5e7eb] rounded-md px-2"
            onChange={(e) => {
              setSelect(e.target.value);
              getListBills(searchText, e.target.value);
            }}
            value={select}
          >
            <option
              value={""}
              className=" bg-white font-medium border-b border-gray-400"
            >
              Tất cả trạng thái
            </option>
            <option
              value="0"
              className="text-red-500 bg-white font-medium border-b border-gray-400"
            >
              Chờ xác nhận
            </option>
            <option
              value="1"
              className="text-yellow-400 bg-white font-medium border-b border-gray-400"
            >
              Đang đóng hàng
            </option>
            <option
              value="2"
              className="text-blue-400 bg-white font-medium border-b border-gray-400"
            >
              Đã thanh toán
            </option>
            <option value="3" className="text-green-500 bg-white font-medium">
              Đã hoàn thành
            </option>
          </select>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            name="searchText"
            id="searchText"
            className="!border !border-gray-500 !bg-white"
            value={searchText || ""}
          ></Input>
          <button
            className="p-2 mb-4 min-w-[100px] bg-blue-400 rounded-md cursor-pointer"
            onClick={() => getListBills(searchText, select)}
          >
            Tìm kiếm
          </button>
          <button
            className="p-2 mb-4 min-w-[80px] bg-red-400 rounded-md cursor-pointer"
            onClick={() => {
              getListBills();
              setSearchText("");
              setSelect("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="w-full p-2 overflow-x-scroll">
        <table className="w-full border border-collapse border-slate-400">
          <thead>
            <tr className="bg-gray-400 border">
              <th className="border border-slate-600  min-w-[200px]">
                Họ và tên
              </th>
              <th className="border border-slate-600  min-w-[80px]">Mã đơn</th>
              <th className="border border-slate-600 min-w-[180px]">Địa chỉ</th>
              <th className="border border-slate-600 min-w-[250px]">
                Đơn hàng
              </th>
              <th className="border border-slate-600 min-w-[150px]">
                Tổng tiền
              </th>
              <th className="border border-slate-600 min-w-[150px]">
                Trạng thái
              </th>
              <th className="border border-slate-600 min-w-[120px]">Ngày</th>
              <th className="border border-slate-600 min-w-[150px]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {arrBill?.length > 0 &&
              arrBill.map((item, index) => (
                <tr className="hover:bg-gray-300" key={index}>
                  <td className="border border-slate-600  min-w-[200px] px-1">
                    {item.fullName} <br></br>
                    {item.phoneNumber} <br></br>
                  </td>
                  <td className="border border-slate-600  min-w-[80px] px-1">
                    {item.billsCode}
                  </td>
                  <td className="border border-slate-600  min-w-[180px] px-1">
                    {item.address}
                  </td>
                  <td className="border border-slate-600  min-w-[250px] px-1">
                    {handleMapProducts(item.productId)}
                  </td>
                  <td className="border border-slate-600  min-w-[150px] px-1">
                    {number_to_price(item.totalPrice)} VND
                  </td>
                  <td className="border border-slate-600  min-w-[150px] px-1">
                    {item.status === 0 ? (
                      <span className="text-red-500 font-semibold">
                        Chờ xác nhận
                      </span>
                    ) : item.status === 1 ? (
                      <span className="text-yellow-500 font-semibold">
                        Đang đóng hàng
                      </span>
                    ) : item.status === 2 ? (
                      <span className="text-blue-500 font-semibold">
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold">
                        Đã hoàn thành
                      </span>
                    )}
                  </td>
                  <td className="border border-slate-600  min-w-[120px] px-1">
                    {formatYMDToDMY(item.createdAt) || ""}
                  </td>
                  <td className="flex justify-center gap-5 p-2 border border-slate-600 min-w-[150px] px-1">
                    <button
                      className="p-2 bg-green-400 rounded-md"
                      onClick={() => {
                        handleUpdateBill(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="black"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-2 bg-red-400 rounded-md"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="black"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <DeletePopup
        open={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteProductId(undefined);
        }}
        content="Bạn có chắc muốn xoá đơn hàng này?"
        handleAgree={handleAgreeDelete}
      ></DeletePopup>
      <UpdateBill
        billDetail={billDetail}
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      ></UpdateBill>
    </div>
  );
};

export default Admin;
