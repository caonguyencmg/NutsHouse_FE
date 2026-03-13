import { useEffect, useState } from "react";
import Header from "../../component/layout/Header";
import { number_to_price } from "../../helper/common";
import { deleteProduct, getListProduct } from "../../service/productService";
import DeletePopup from "../../component/layout/deletePopup";
import { toast } from "react-toastify";
import UpdateProduct from "../updateProduct.js";
import { Select } from "antd";

const Products = () => {
  const [listProducts, setListProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();
  const [productDetail, setProductDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [select, setSelect] = useState("");

  const getListProducts = async (status) => {
    let response = await getListProduct(status);
    if (response && response.statusCode === 200) {
      const products = response.products.map((item) => ({
        ...item,
        img: JSON.parse(item.img),
      }));
      setListProducts(products);
    }
  };

  const handleDeleteProduct = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleAgreeDelete = async () => {
    let response = await deleteProduct({ id: deleteProductId });
    if (response && response.status === 200) {
      toast.success("Xoá sản phẩm thành công!", {
        autoClose: 300,
      });
      setShowDeleteModal(false);
      setDeleteProductId(undefined);
      getListProducts();
    }
  };

  const handleUpdateBill = (bill) => {
    setProductDetail(bill);
    setShowModal(true);
  };

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div className="pb-10">
      <Header></Header>

      <h1 className="flex items-center justify-center pt-[90px] mb-3 text-3xl">
        Danh sách Hàng hoá
      </h1>
      <div className="flex gap-6 justify-end px-2 md:px-6">
        <div>
          <Select
            value={select}
            className="min-w-[180px]"
            size="large"
            onChange={(e) => {
              setSelect(e.target.value);
              getListProducts(e.target.value);
            }}
            options={[
              {
                value: "",
                label: <span className="font-medium">Tất cả trạng thái</span>,
              },
              {
                value: "1",
                label: (
                  <span className="text-green-500 font-medium">Còn hàng</span>
                ),
              },
              {
                value: "0",
                label: (
                  <span className="text-red-500 font-medium">Hết hàng</span>
                ),
              },
            ]}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="h-11 mb-4 min-w-[80px] bg-blue-400 text-white font-medium rounded-md cursor-pointer"
            onClick={() => {
              getListProducts();
              setSelect("");
            }}
          >
            Thêm mới
          </button>
        </div>
      </div>
      <div className="w-full p-2 overflow-x-auto">
        <table className="w-full border border-collapse border-slate-400">
          <thead>
            <tr className="bg-gray-400 border">
              <th className="border border-slate-600  min-w-[180px]">
                Tên hàng
              </th>
              <th className="border border-slate-600 min-w-[280px] max-w-[350px]">
                Giới thiệu
              </th>
              <th className="border border-slate-600 min-w-[120px]">Ảnh</th>
              <th className="border border-slate-600 min-w-[150px]">Giá</th>
              <th className="border border-slate-600 min-w-[100px]">
                Số lượng
              </th>
              <th className="border border-slate-600 min-w-[150px]">
                Trạng thái
              </th>
              <th className="border border-slate-600 min-w-[150px]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {listProducts?.length > 0 &&
              listProducts.map((item, index) => (
                <tr className="hover:bg-gray-300" key={index}>
                  <td className="border border-slate-600  min-w-[180px] px-1">
                    {item.name}
                  </td>
                  <td className="border border-slate-600  max-w-[350px] px-1">
                    <div className="line-clamp-4">{item.description}</div>
                  </td>
                  <td className="border border-slate-600  min-w-[120px]  px-1">
                    <div className="flex justify-center">
                      <img
                        className="max-w-[100px]"
                        src={process.env.REACT_APP_BACKEND_URL + item?.img[0]}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="border border-slate-600  min-w-[150px] px-1">
                    {number_to_price(item.price)} VND
                  </td>
                  <td className="border border-slate-600  min-w-[100px] px-1 font-bold text-lg">
                    <div className="text-center">
                      {item.quantity > 0 ? (
                        <span className="bg-green-300 px-6 rounded-3xl">
                          {item.quantity}
                        </span>
                      ) : (
                        <span className="bg-red-300 px-6 rounded-3xl">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="border border-slate-600  min-w-[150px] px-1">
                    <div className="text-center">
                      {item.quantity > 0 ? (
                        <span className="bg-green-300 px-6 rounded-3xl font-medium">
                          Còn hàng
                        </span>
                      ) : (
                        <span className="bg-red-300 px-6 rounded-3xl font-medium">
                          Hết hàng
                        </span>
                      )}
                    </div>
                  </td>
                  <td className=" border border-slate-600 min-w-[150px]">
                    <div className="flex justify-center gap-5 p-2 px-1">
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
                        onClick={() => handleDeleteProduct(item.id)}
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
                    </div>
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
        content="Bạn có chắc muốn xoá sản phẩm này?"
        handleAgree={handleAgreeDelete}
      ></DeletePopup>
      <UpdateProduct
        productDetail={productDetail}
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        callBackGetList={getListProducts}
      ></UpdateProduct>
    </div>
  );
};

export default Products;
