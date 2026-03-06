import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import { toast } from "react-toastify";
import { getAllUsers, deleteUser } from "../service/userService";
import { getListProduct } from "../service/maratonService";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
import DeletePopup from "../component/layout/deletePopup";
import { formatYMDToDMY } from "../helper/common";
import Field from "../component/field/Field";
import { Input } from "../component/input";
import { useForm } from "react-hook-form";
const HomePage = () => {
  const [errMess, setErrMess] = useState("");
  const [success, setSuccess] = useState("");
  const [getUser, setGetUser] = useState([]);
  const [arrUser, setArrUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [listMaraton, setListMaraton] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { control } = useForm({});
  const getData = async () => {
    let response = await getAllUsers("All", searchText);
    if (response && response.errCode === 0) {
      setArrUser(response.users);
    }
  };
  const getListProducts = async () => {
    let response = await getListProduct();
    if (response && response.statusCode === 200) {
      setListMaraton(response.maraton);
    }
  };
  const handleDeleteUser = async (userId) => {
    setShowDeleteModal(true);
    setDeleteUserId(userId);
  };
  const handleGetUserDetail = async (userId) => {
    setShowModal(true);
    let response = await getAllUsers(userId);
    if (response && response.errCode === 0) {
      setGetUser(response.users);
    }
  };

  const handleAddUser = async () => {
    setShowAddModal(true);
    let response = await getAllUsers();
    if (response && response.errCode === 0) {
      setGetUser(response.users);
    }
  };

  const getMaratontype = (type) => {
    return (
      listMaraton.find((item) => Number(item.id) === Number(type))?.name || ""
    );
  };

  const handleAgreeDelete = async () => {
    setErrMess("");
    setSuccess("");
    try {
      let res = await deleteUser(deleteUserId);
      if (res && res.errCode === 0) {
        getData();
        setSuccess(res.message);
      } else {
        setErrMess(res.errMessage);
      }
    } catch (error) {
      setErrMess("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    getData();
    getListProducts();
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
  }, [errMess, success, showModal]);

  return (
    <div>
      <Header handleGetUserDetail={handleGetUserDetail}></Header>
      <AddUser
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      ></AddUser>
      <UpdateUser
        userDetail={getUser}
        listMaraton={listMaraton}
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      ></UpdateUser>
      <DeletePopup
        open={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteUserId(undefined);
        }}
        content="Bạn có chắc muốn xoá thí sinh này khỏi danh sách?"
        handleAgree={handleAgreeDelete}
      ></DeletePopup>

      <h1 className="flex items-center justify-center mt-[106px] text-3xl">
        Danh sách người đăng ký
      </h1>
      <div className="flex gap-6 justify-end px-6">
        <div className="flex gap-2">
          <Field className="w-full">
            <Input
              type="text"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              name="signupfullname"
              id="signupfullname"
              value={searchText || ""}
              control={control}
            ></Input>
          </Field>
          <button
            className="p-2 mb-4 w-[125px] bg-blue-300 rounded-md cursor-pointer"
            onClick={() => getData()}
          >
            Tìm kiếm
          </button>
        </div>
        <div>
          <button
            className="p-2 bg-blue-300 rounded-md cursor-pointer"
            onClick={() => handleAddUser()}
          >
            Thêm mới
          </button>
        </div>
      </div>
      <div className="w-full p-5 overflow-x-scroll">
        <table className="w-full border border-collapse border-slate-400">
          <thead>
            <tr className="bg-gray-400 border">
              {/* colSpan={2} rowSpan={2} */}
              <th className="border border-slate-600  min-w-[250px]">
                Họ và tên
              </th>
              <th className="border border-slate-600 min-w-[200px]">
                Ngày sinh
              </th>
              <th className="border border-slate-600 min-w-[120px]">
                Giới tính
              </th>
              <th className="border border-slate-600 min-w-[250px]">Email</th>
              <th className="border border-slate-600 min-w-[200px]">
                Số điện thoại
              </th>
              <th className="border border-slate-600 min-w-[180px]">
                Cuộc thi
              </th>
              <th className="border border-slate-600 min-w-[150px]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {arrUser?.length > 0 &&
              arrUser.map((item, index) => (
                <tr className="hover:bg-gray-300" key={index}>
                  <td className="border border-slate-600  min-w-[250px]">
                    {item.fullname}
                  </td>
                  <td className="border border-slate-600  min-w-[200px]">
                    {formatYMDToDMY(item.birthday)}
                  </td>
                  <td className="border border-slate-600  min-w-[120px]">
                    {item.gender === 1 ? "Nam" : "Nữ"}
                  </td>
                  <td className="border border-slate-600  min-w-[250px]">
                    {item.email}
                  </td>
                  <td className="border border-slate-600  min-w-[200px]">
                    {item.phoneNumber}
                  </td>
                  <td className="border border-slate-600  min-w-[180px]">
                    {getMaratontype(item.maratontype)}
                  </td>
                  <td className="flex justify-center gap-5 p-2 border border-slate-600 min-w-[150px]">
                    <button
                      className="p-2 bg-green-400 rounded-md"
                      onClick={() => {
                        handleGetUserDetail(item.id);
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
    </div>
  );
};

export default HomePage;
