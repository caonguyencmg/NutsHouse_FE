import React, { useEffect, useState } from "react";
import { createBill } from "../service/userService";
import { createPortal } from "react-dom";
import { Form, Input, Radio } from "antd";
import { toast } from "react-toastify";
import {
  number_to_price,
  validateNumberPhone,
  validateOnlyNumber,
} from "../helper/common";
import { useDispatch } from "react-redux";
import { deleteAll } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const BuyProducts = ({
  shopCard,
  totalPrice,
  listProducts,
  open = false,
  handleClose = () => {},
}) => {
  const [bill, setBill] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
  });
  const [errMess, setErrMess] = useState("");
  const [success, setSuccess] = useState("");
  const [typePayment, setTypePayment] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (value, id) => {
    setBill({
      ...bill,
      [id]: value,
    });
  };

  const resetSignup = () => {
    handleClose();
    setBill({
      fullname: "",
      address: "",
      phoneNumber: "",
    });
    setSuccess("");
    setErrMess("");
    form.resetFields();
    setTypePayment(0);
  };

  const handleSubmit = async () => {
    const orderItems = listProducts.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const billsCode =
      bill?.phoneNumber.slice(-3) +
      Date.now().toString(36).toUpperCase().slice(-3);
    const dataBill = {
      ...bill,
      billsCode,
      productId: JSON.stringify(orderItems),
      total: totalPrice,
    };
    try {
      let data = await createBill(dataBill);
      if (data && data.status === 200) {
        setSuccess("Đặt hàng thành công!!");
        setTimeout(() => {
          resetSignup();
          if (shopCard) {
            dispatch(deleteAll());
          }
          navigate("/bill?code=" + billsCode);
        }, 300);
      } else {
        setErrMess(data?.errMessage || "Đặt hàng không thành công");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMess(error.response.data.message);
        }
      }
    }
  };

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
    <>
      {typePayment === 1 && (
        <div className="p-4 mt-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="mb-2 font-semibold">Chuyển khoản đến:</p>
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.dbizxLRrQEpIVS6-dqQLtgHaGE?pid=Api&P=0&h=180"
            alt=""
          />
        </div>
      )}
      <div
        className={`fixed top-0 w-full z-50 transition-all  ${
          open ? "" : "invisible opacity-0 "
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer overlay"
          onClick={resetSignup}
        ></div>
        <div className="min-h-[100vh] !px-4 !py-6 md:!p-10 container">
          <div className="md:p-5 p-3 pt-0 md:w-[85%] lg:w-[50%] rounded-xl bg-white mx-auto relative z-10">
            <span
              onClick={resetSignup}
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
            <h1 className="mb-3 text-3xl font-bold text-center text-black">
              Đơn hàng
            </h1>
            <div className="overflow-auto max-h-[80vh]">
              {listProducts.length > 0 &&
                listProducts.map((item) => (
                  <div
                    className="px-3 py-2 border border-gray-300 mb-2 items-center rounded-lg grid gap-x-5 grid-cols-[0.3fr_8fr]"
                    key={item.id}
                  >
                    <div className="min-w-[64px] w-full xl:max-h-[76px] mobile:w-[90px] flex items-center justify-center overflow-hidden">
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + item?.img?.[0]}
                        alt=""
                        className="max-w-full max-h-full object-contain rounded aspect-[8/10]"
                      />
                    </div>
                    <div className="lg:grid lg:gap-x-5 gap-x-1 grid-cols-[4fr_1.6fr] items-center">
                      <div>
                        <div className=" text-gray-700 font-semibold text-base">
                          {item?.name}
                        </div>
                        <div className="min-w-[180px]">
                          <div>
                            Đơn giá:
                            <span className="text-blue-500 font-semibold">
                              {" " + number_to_price(item?.price || 0)} VND
                            </span>
                          </div>
                          <div className="flex text-gray-500 items-center">
                            Số lượng: {item?.quantity}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>Thành tiền:</div>
                        <div className="text-red-500 font-semibold">
                          {number_to_price(
                            Number(item?.price) * Number(item?.quantity) || 0,
                          )}{" "}
                          VND
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="overflow-auto max-h-[70vh]">
                <Form
                  form={form}
                  layout="vertical"
                  name="form"
                  onFinish={handleSubmit}
                  fields={[
                    {
                      name: ["billfullname"],
                      value: bill.fullname,
                    },
                    {
                      name: ["billphoneNumber"],
                      value: bill.phoneNumber,
                    },
                    {
                      name: ["billaddress"],
                      value: bill.address,
                    },
                  ]}
                >
                  <Form.Item
                    label="Họ và tên"
                    name="billfullname"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Họ và tên",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      name="billfullname"
                      onChange={(e) => {
                        handleOnChange(e.target.value, "fullname");
                      }}
                      value={bill.fullname}
                      id="billfullname"
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    name="billphoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Số điện thoại",
                      },
                      {
                        validator: (_, value) => {
                          if (
                            value &&
                            (!validateOnlyNumber(value.trim()) ||
                              !validateNumberPhone(value))
                          ) {
                            return Promise.reject("Số điện thoại không hợp lệ");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                      {
                        min: 10,
                        message: "Số điện thoại quá ngắn",
                      },
                      {
                        max: 11,
                        message: "Số điện thoại quá dài",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="035786..."
                      name="billphoneNumber"
                      onChange={(e) => {
                        handleOnChange(e.target.value, "phoneNumber");
                      }}
                      value={bill.fullname}
                      id="billphoneNumber"
                    ></Input>
                  </Form.Item>
                  <Form.Item label="Địa chỉ" name="billaddress">
                    <Input
                      type="text"
                      placeholder="123,Lê Lợi,..."
                      name="billaddress"
                      onChange={(e) => {
                        handleOnChange(e.target.value, "address");
                      }}
                      value={bill.fullname}
                      id="billaddress"
                    ></Input>
                  </Form.Item>

                  <label htmlFor="">Thanh toán</label>
                  <Radio.Group
                    className="grid"
                    defaultValue={typePayment}
                    onChange={(e) => {
                      setTypePayment(e.target.value);
                    }}
                  >
                    <Radio value={0}>Thanh toán khi nhận hàng</Radio>
                    <Radio value={1}>Chuyển khoản ngân hàng</Radio>
                  </Radio.Group>

                  <div className="w-100 flex justify-center mt-4">
                    <button
                      className="py-4 px-8 bg-red-500 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 h-[46px]"
                      type="submit"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("body"),
  );
};

export default BuyProducts;
