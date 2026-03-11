import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import { Form, Input } from "antd";
import { getAllBills } from "../service/userService";
import { toast } from "react-toastify";
import { number_to_price } from "../helper/common";
import { getListProduct } from "../service/productService";

const SearchBill = () => {
  const [billCode, setBillCode] = useState("");
  const [billDetail, setBillDetail] = useState();
  const [listProducts, setListProducts] = useState([]);
  const [search, setSearch] = useState(false);
  const [form] = Form.useForm();

  const handleOnChange = (value, id) => {
    setBillCode(value);
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

  const handleSubmit = async () => {
    setSearch(false);
    try {
      let response = await getAllBills(null, null, billCode);

      if (response && response.status === 200) {
        setBillDetail(response.bills[0]);
      } else {
        toast.error(
          response?.errMessage || "Lấy thông tin thất bại. Vui lòng thử lại.",
          {
            delay: 100,
          },
        );
      }
      setSearch(true);
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          toast.error(error.response.data.message, {
            delay: 100,
          });
        }
      }
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center mt-[76px] h-[100vh]">
        <div className="flex flex-col pt-5 max-h-[70vh] container justify-center items-center">
          <div className="text-2xl mb-4">Tra cứu đơn hàng</div>
          <Form
            form={form}
            layout="vertical"
            className="w-[300px]"
            name="form"
            onFinish={handleSubmit}
            fields={[
              {
                name: ["billCode"],
                value: billCode,
              },
            ]}
          >
            <Form.Item
              label={<span>Mã đơn hàng</span>}
              name="billCode"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Mã đơn hàng",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Mã đơn hàng"
                name="billCode"
                onChange={(e) => {
                  handleOnChange(e.target.value, "billCode");
                }}
                value={billCode}
                id="billCode"
              ></Input>
            </Form.Item>

            <div className="w-100 flex justify-center mt-4">
              <button
                className="py-4 px-8 bg-red-500 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 h-[46px]"
                type="submit"
              >
                Tra cứu đơn hàng
              </button>
            </div>
          </Form>
        </div>

        {billDetail ? (
          <div className="max-w-[500px] w-full mt-5 border py-2 px-4 rounded-md text-base">
            <div className="flex justify-between border-b mb-2 pb-3 border-dashed border-gray-400">
              <div className="font-medium">Mã đơn hàng: </div>
              <span className="font-medium text-red-500">
                {billDetail.billsCode}
              </span>
            </div>
            <div className="flex justify-between border-b mb-2 pb-3 border-dashed border-gray-400">
              <div className="font-medium">Họ và tên: </div>
              <span className="font-medium">{billDetail.fullName}</span>
            </div>
            <div className="flex justify-between border-b mb-2 pb-3 border-dashed border-gray-400">
              <div className="font-medium">Số điện thoại: </div>
              <span className="font-medium">{billDetail.phoneNumber}</span>
            </div>
            <div className="flex justify-between border-b mb-2 pb-3 border-dashed border-gray-400">
              <div className="font-medium">Đơn hàng: </div>
              <span className="font-medium max-w-[300px]">
                {handleMapProducts(billDetail.productId)}
              </span>
            </div>
            <div className="flex justify-between border-b mb-2 pb-3 border-dashed border-gray-400">
              <div className="font-medium">Giá tiền: </div>
              <span className="font-medium">
                {number_to_price(billDetail.totalPrice)} VND
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <div className="font-medium">Trạng thái: </div>
              <span
                className={`font-bold text-xl ${
                  billDetail.status === 0
                    ? "text-red-500"
                    : billDetail.status === 1
                      ? "text-yellow-500"
                      : billDetail.status === 2
                        ? "text-blue-500"
                        : "text-green-500"
                }`}
              >
                {billDetail.status === 0
                  ? "Chờ xác nhận"
                  : billDetail.status === 1
                    ? "Đang đóng hàng"
                    : billDetail.status === 2
                      ? "Đã thanh toán"
                      : "Đã hoàn thành"}
              </span>
            </div>
          </div>
        ) : (
          !billDetail &&
          search && (
            <div className="text-red-500 font-semibold text-2xl mt-5">
              Không tìm thấy mã đơn hàng. Vui lòng kiểm tra lại.
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SearchBill;
