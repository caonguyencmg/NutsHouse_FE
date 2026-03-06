import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import "./index.scss";
import { editBill } from "../service/userService";
import { Form, Input } from "antd";
import { number_to_price } from "../helper/common";

const UpdateBill = ({ open = false, handleClose = () => {}, billDetail }) => {
  const [dataBill, setDataBill] = useState({
    id: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    listProducts: "",
    totalPrice: "",
    status: "",
  });
  const [errMess, setErrMess] = useState("");
  const [success, setSuccess] = useState("");

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSubmit = async () => {
    let updateData = {
      id: dataBill.id,
      status: dataBill.status,
      address: dataBill.address,
    };
    setErrMess("");
    setSuccess("");
    try {
      let data = await editBill(updateData);
      if (data && data.status === 200) {
        setSuccess("Cập nhập đơn hàng thành công");
        handleClose();
        window.location.reload();
      } else {
        setErrMess("Cập nhập đơn hàng thất bại");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMess(
            error.response.data.errMessage || "Cập nhập đơn hàng thất bại",
          );
        }
      }
    }
  };
  let dataBills = "";
  dataBills = billDetail;
  const handleOnChange = (e, id) => {
    setDataBill({
      ...dataBill,
      [id]: e.target.value,
    });
  };
  const handleGetData = () => {
    setDataBill({
      id: billDetail.id,
      fullName: billDetail.fullName,
      phoneNumber: billDetail.phoneNumber,
      address: billDetail.address,
      listProducts: billDetail.listProducts,
      totalPrice: billDetail.totalPrice,
      status: billDetail.status,
    });
  };

  useEffect(() => {
    if (billDetail) {
      handleGetData();
    }
  }, [dataBills]);

  useEffect(() => {
    if (errMess) {
      toast.error(errMess, {
        delay: 100,
      });
    }
    if (success) {
      toast.success(success, {
        delay: 100,
      });
    }
  }, [errMess, success]);

  if (typeof document === "undefined") return <div className="modal"></div>;
  return createPortal(
    <div
      className={`fixed top-0 w-full z-50 transition-all  ${
        open ? "" : "invisible opacity-0 "
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer overlay"
        onClick={handleClose}
      ></div>
      <div className="min-h-[100vh] !p-10 container">
        <div className="p-5 pt-0 w-[70%] rounded-xl bg-white mx-auto relative z-10 ">
          <span
            onClick={handleClose}
            className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-red-400 -translate-y-1/3 translate-x-1/3"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
                fill="#84878B"
              />
            </svg>
          </span>
          <h1 className="mb-3 pt-3 text-3xl font-bold text-center">
            Cập nhật đơn hàng
          </h1>
          <div className="overflow-auto max-h-[70vh]">
            <Form
              form={form}
              layout="vertical"
              name="form"
              onFinish={handleSubmit}
              fields={[
                {
                  name: ["fullName"],
                  value: dataBill.fullName,
                },
                {
                  name: ["phoneNumber"],
                  value: dataBill.phoneNumber,
                },
                {
                  name: ["address"],
                  value: dataBill.address,
                },
                {
                  name: ["listProducts"],
                  value: dataBill.listProducts,
                },
                {
                  name: ["totalPrice"],
                  value: number_to_price(dataBill.totalPrice) + " VND",
                },
                {
                  name: ["status"],
                  value: dataBill.status,
                },
              ]}
            >
              <div className=" grid gap-x-4 grid-cols-2">
                <Form.Item label={<span>Họ và tên</span>} name="fullName">
                  <Input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    name="fullName"
                    value={billDetail.fullName}
                    id="fullName"
                    disabled
                    className="disabled"
                  ></Input>
                </Form.Item>
                <Form.Item
                  label={<span>Số điện thoại</span>}
                  name="phoneNumber"
                >
                  <Input
                    type="text"
                    placeholder="035786..."
                    name="phoneNumber"
                    disabled
                    className="disabled"
                    value={billDetail.fullname}
                    id="phoneNumber"
                  ></Input>
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <TextArea
                    type="text"
                    placeholder="123,Lê Lợi,..."
                    name="address"
                    onChange={(e) => {
                      handleOnChange(e, "address");
                    }}
                    className="min-h-[64px]"
                    rows={4}
                    value={billDetail.fullname}
                    id="address"
                  ></TextArea>
                </Form.Item>
                <Form.Item label={<span>Đơn hàng</span>} name="listProducts">
                  <TextArea
                    type="text"
                    name="listProducts"
                    disabled
                    className="disabled min-h-[64px]"
                    value={billDetail.listProducts}
                    id="listProducts"
                  ></TextArea>
                </Form.Item>
                <Form.Item label={<span>Tổng tiền</span>} name="totalPrice">
                  <Input
                    type="text"
                    name="totalPrice"
                    disabled
                    className="disabled"
                    value={number_to_price(billDetail.totalPrice) + " VND"}
                    id="totalPrice"
                  ></Input>
                </Form.Item>
                <Form.Item label={<span>Trạng thái</span>} name="status">
                  <select
                    name="status"
                    id="status"
                    className="w-full h-11 bg-[#e5e7eb] rounded-md px-2"
                    onChange={(e) => {
                      handleOnChange(e, "status");
                    }}
                  >
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
                    <option
                      value="3"
                      className="text-green-500 bg-white font-medium"
                    >
                      Đã hoàn thành
                    </option>
                  </select>
                </Form.Item>
              </div>
              <div className="w-100 flex justify-center mt-4">
                <button
                  className="py-4 px-8 bg-red-500 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 h-[46px]"
                  type="submit"
                >
                  Lưu
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body"),
  );
};

export default UpdateBill;
