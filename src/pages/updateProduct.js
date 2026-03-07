import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import "./index.scss";

import { Form, Input } from "antd";
import { number_to_price } from "../helper/common";
import UploadImgs from "../component/upload/UploadImgs";
import { editProduct } from "../service/productService";
const UpdateProduct = ({
  open = false,
  handleClose = () => {},
  productDetail,
  callBackGetList,
}) => {
  const [dataBill, setDataBill] = useState({
    id: "",
    name: "",
    description: "",
    quantity: "",
    price: "",
    date: "",
  });
  const [errMess, setErrMess] = useState("");
  const [success, setSuccess] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("id", dataBill.id);
    formData.append("date", dataBill.date);
    formData.append("description", dataBill.description);
    formData.append("name", dataBill.name);
    formData.append("price", dataBill.price);
    formData.append("quantity", dataBill.quantity);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        // ảnh mới
        formData.append("newImages", file.originFileObj);
      } else if (file.url) {
        // ảnh cũ
        formData.append(
          "oldImages",
          file.url.replaceAll(process.env.REACT_APP_BACKEND_URL, ""),
        );
      }
    });

    setErrMess("");
    setSuccess("");

    try {
      let data = await editProduct(formData);

      if (data && data.statusCode === 200) {
        setSuccess("Cập nhập đơn hàng thành công");
        handleClose();
        handleGetData();
        callBackGetList();
      } else {
        setErrMess("Cập nhập đơn hàng thất bại");
      }
    } catch (error) {
      if (error.response?.data) {
        setErrMess(
          error.response.data.errMessage || "Cập nhập đơn hàng thất bại",
        );
      }
    }
  };
  let dataBills = "";
  dataBills = productDetail;
  const handleOnChange = (e, id) => {
    setDataBill({
      ...dataBill,
      [id]: e.target.value,
    });
  };

  const handleGetData = () => {
    setDataBill({
      id: productDetail.id,
      name: productDetail.name,
      phoneNumber: productDetail.phoneNumber,
      description: productDetail.description,
      quantity: productDetail.quantity,
      price: productDetail.price,
      img: productDetail.img,
      date: productDetail.date,
    });
  };

  useEffect(() => {
    if (productDetail) {
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
            Cập nhật sản phẩm
          </h1>
          <div className="overflow-auto max-h-[70vh]">
            <Form
              form={form}
              layout="vertical"
              name="form"
              onFinish={handleSubmit}
              fields={[
                {
                  name: ["name"],
                  value: dataBill.name,
                },
                {
                  name: ["description"],
                  value: dataBill.description,
                },
                {
                  name: ["img"],
                  value: dataBill.img,
                },
                {
                  name: ["quantity"],
                  value: dataBill.quantity,
                },
                {
                  name: ["price"],
                  value: number_to_price(dataBill.price) + " VND",
                },
                {
                  name: ["date"],
                  value: dataBill.date,
                },
              ]}
            >
              <div className="grid grid-cols-2 gap-x-2">
                <Form.Item label={<span>Tên</span>} name="name">
                  <Input
                    type="text"
                    placeholder="Hạt dẻ"
                    name="name"
                    onChange={(e) => {
                      handleOnChange(e, "name");
                    }}
                    value={productDetail.name}
                    id="name"
                  ></Input>
                </Form.Item>
                <Form.Item
                  label={
                    <span
                      className={`${productDetail.quantity < 0 ? "text-red-500" : "text-green-500"} font-semibold`}
                    >
                      Số lượng đang có
                    </span>
                  }
                  name="quantity"
                >
                  <Input
                    type="text"
                    name="quantity"
                    onChange={(e) => {
                      handleOnChange(e, "quantity");
                    }}
                    value={productDetail.quantity}
                    id="quantity"
                  ></Input>
                </Form.Item>

                <Form.Item
                  className="col-span-2"
                  label="Giới thiệu"
                  name="description"
                >
                  <TextArea
                    type="text"
                    placeholder="123,Lê Lợi,..."
                    name="description"
                    onChange={(e) => {
                      handleOnChange(e, "description");
                    }}
                    className="min-h-[136px]"
                    rows={4}
                    value={productDetail.name}
                    id="description"
                  ></TextArea>
                </Form.Item>
                <Form.Item label={<span>Giá tiền</span>} name="price">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      name="price"
                      onChange={(e) => {
                        handleOnChange(e, "price");
                      }}
                      value={number_to_price(productDetail.price)}
                      id="price"
                    ></Input>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      VNĐ
                    </span>
                  </div>
                </Form.Item>
                <Form.Item label={<span>Hạn sử dụng</span>} name="date">
                  <Input
                    type="text"
                    name="date"
                    onChange={(e) => {
                      handleOnChange(e, "date");
                    }}
                    value={productDetail.date}
                    id="date"
                  ></Input>
                </Form.Item>
                <Form.Item
                  className="col-span-2"
                  label={<span>Hình ảnh</span>}
                  name="date"
                >
                  <UploadImgs
                    listImgs={productDetail.img}
                    fileList={fileList}
                    setFileList={setFileList}
                  ></UploadImgs>
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

export default UpdateProduct;
