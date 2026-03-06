import React, { useEffect, useState } from "react";
import { Label } from "../component/label";
import { Input } from "../component/input";
import Field from "../component/field/Field";
import { useForm } from "react-hook-form";
import Button from "../component/button/Button";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import "./index.scss";
import { editUser } from "../service/userService";

const UpdateUser = ({
  open = false,
  handleClose = () => {},
  userDetail,
  listMaraton,
}) => {
  const [dataUser, setDataUser] = useState({
    id: "",
    email: "",
    fullname: "",
    birthday: "",
    phoneNumber: "",
    gender: "",
  });
  const [errMess, setErrMess] = useState("");

  const [success, setSuccess] = useState("");
  const { control, handleSubmit } = useForm({});

  const checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "fullname", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!dataUser[arrInput[i]]) {
        isValid = false;
        setErrMess("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleUpdateUser = async () => {
    let updateData = dataUser;
    let isValid = checkValideInput();
    if (isValid === true) {
      setErrMess("");
      setSuccess("");
      try {
        let data = await editUser(updateData);
        if (data && data.errCode !== 0) {
          setErrMess(data.errMessage);
        } else if (data && data.errCode === 0) {
          setSuccess("Update user success.");
          handleClose();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            setErrMess(error.response.data.message);
          }
        }
      }
    }
  };
  let dataUsers = "";
  dataUsers = userDetail;
  const handleOnChange = (e, id) => {
    setDataUser({
      ...dataUser,
      [id]: e.target.value,
    });
  };
  const handleGetData = () => {
    setDataUser({
      id: userDetail.id,
      email: userDetail.email,
      fullname: userDetail.fullname,
      birthday: userDetail.birthday,
      phoneNumber: userDetail.phoneNumber,
      gender: userDetail.gender,
    });
  };

  useEffect(() => {
    if (userDetail) {
      handleGetData();
    }
  }, [dataUsers]);

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
          <h1 className="mb-3 text-3xl font-bold text-center text-primary">
            <span className="text-4xl text-blue-400">C</span>oding{" "}
            <span className="text-4xl text-blue-400">E</span>xperience
          </h1>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="grid grid-cols-2 gap-x-5">
              <Field className="w-full">
                <Label>Họ và tên *</Label>
                <Input
                  type="fullname"
                  onChange={(e) => {
                    handleOnChange(e, "fullname");
                  }}
                  name="signupfullname"
                  id="signupfullname"
                  value={dataUser.fullname || ""}
                  control={control}
                ></Input>
              </Field>
              <Field className="w-full">
                <Label>Email *</Label>
                <Input
                  type="email"
                  onChange={(e) => {
                    handleOnChange(e, "email");
                  }}
                  readOnly
                  disabled
                  name="signupemail"
                  id="signupemail"
                  className="disabled"
                  value={dataUser.email || ""}
                  control={control}
                ></Input>
              </Field>
              <Field className="w-full">
                <Label htmlFor="signupbirthday">Ngày sinh</Label>
                <Input
                  type="text"
                  name="signupbirthday"
                  onChange={(e) => {
                    handleOnChange(e, "birthday");
                  }}
                  value={dataUser.birthday || ""}
                  id="signupbirthday"
                  control={control}
                ></Input>
              </Field>

              <Field className="w-full">
                <Label htmlFor="signupgender">Giới tính</Label>
                <select
                  type="text"
                  name="signupgender"
                  onChange={(e) => {
                    handleOnChange(e, "gender");
                  }}
                  value={dataUser.gender || ""}
                  id="signupgender"
                  className="p-3 bg-gray-200 rounded-lg"
                >
                  {dataUser.gender ? (
                    <>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                    </>
                  ) : (
                    <>
                      <option value="0">Nữ</option>
                      <option value="1">Nam</option>
                    </>
                  )}
                </select>
              </Field>
              <Field className="w-full">
                <Label htmlFor="signupphoneNumber">Số điện thoại *</Label>
                <Input
                  type="select"
                  placeholder="Phone Number ..."
                  name="signupphoneNumber"
                  className="w-[250px]"
                  onChange={(e) => {
                    handleOnChange(e, "phoneNumber");
                  }}
                  value={dataUser.phoneNumber || ""}
                  id="signupphoneNumber"
                  control={control}
                ></Input>
              </Field>
              <Field className="w-full">
                <Label htmlFor="signupmaraton">Cuộc thi</Label>
                <select
                  type="text"
                  name="signupmaraton"
                  onChange={(e) => {
                    handleOnChange(e, "maratontype");
                  }}
                  value={dataUser.maratontype}
                  id="signupmaraton"
                  className="p-3 bg-gray-200 rounded-lg"
                >
                  {listMaraton?.length > 0 &&
                    listMaraton.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </Field>
            </div>
            <Field>
              <Button type="submit">Save changes</Button>
            </Field>
          </form>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default UpdateUser;
