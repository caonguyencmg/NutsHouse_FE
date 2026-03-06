import React, { useState } from "react";
import Header from "../component/layout/Header";
import { Form, Input } from "antd";
import { userLogin } from "../service/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../reducers/authReducer";

const SearchBill = () => {
  const [billCode, setBillCode] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (value, id) => {
    setBillCode(value);
  };

  const handleSubmit = async () => {
    try {
      let data = await userLogin({ billCode });
      if (data && data.status === 200) {
        dispatch(isLogin());
        navigate("/admin");
        toast.success("Đăng nhập thành công", {
          delay: 100,
        });
        navigate("/admin");
      } else {
        toast.error(data?.errMessage || "Đăng nhập không thành công", {
          delay: 100,
        });
      }
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
      </div>
    </>
  );
};

export default SearchBill;
