import React, { useState } from "react";
import Header from "../component/layout/Header";
import { Form, Input } from "antd";
import { userLogin } from "../service/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../reducers/authReducer";

const Login = () => {
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (value, id) => {
    setLogin({
      ...login,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      let data = await userLogin(login);
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
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="overflow-auto max-h-[70vh] w-[300px]">
          <Form
            form={form}
            layout="vertical"
            name="form"
            onFinish={handleSubmit}
            fields={[
              {
                name: ["userName"],
                value: login.userName,
              },
              {
                name: ["password"],
                value: login.password,
              },
            ]}
          >
            <Form.Item
              label={
                <span>
                  User Name <span className="text-red-500">*</span>
                </span>
              }
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Họ và tên",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Username"
                name="userName"
                onChange={(e) => {
                  handleOnChange(e.target.value, "userName");
                }}
                value={login.userName}
                id="userName"
              ></Input>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Password <span className="text-red-500">*</span>
                </span>
              }
              name="password"
            >
              <Input
                type="password"
                placeholder="Passwork"
                name="password"
                onChange={(e) => {
                  handleOnChange(e.target.value, "password");
                }}
                value={login.fullname}
                id="password"
              ></Input>
            </Form.Item>

            <div className="w-100 flex justify-center mt-4">
              <button
                className="py-4 px-8 bg-red-500 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 h-[46px]"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
