import React, { useEffect, useMemo, useState } from "react";
import Header from "../component/layout/Header";
import { getListProduct } from "../service/productService";
import { useDispatch, useSelector } from "react-redux";
import { number_to_price } from "../helper/common";
import { editCard } from "../reducers/userReducer";
import DeletePopup from "../component/layout/deletePopup";
import { toast } from "react-toastify";
import CardItem from "./CardItem";
import BuyProducts from "./BuyProducts";

const ShoppingCard = () => {
  const [listProducts, setListProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();

  const dataCards = useSelector((state) => {
    return state.shoppingCard || {};
  });

  const getListProducts = async () => {
    let response = await getListProduct();
    if (response && response.statusCode === 200) {
      const products = response.products.map((item) => ({
        ...item,
        img: JSON.parse(item.img),
      }));
      const listCards = dataCards?.cardInfo || [];

      const listProducts = products
        .filter((item) => listCards.some((i) => i.id === item.id))
        .map((item) => {
          const quantity = listCards.find((i) => i.id === item.id)?.quantity;
          return {
            ...item,
            quantity,
          };
        });
      setListProducts(listProducts);
    }
  };

  const handleAgreeDelete = async () => {
    dispatch(editCard({ id: deleteProductId, quantity: 0 }));
    toast.success("Xoá sản phẩm khỏi giỏ hàng thành công!", {
      autoClose: 500,
    });
    setShowDeleteModal(false);
    setDeleteProductId(undefined);
  };

  const totalPrice = useMemo(() => {
    return listProducts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [listProducts]);

  useEffect(() => {
    getListProducts();
  }, [dataCards.cardInfo]);
  return (
    <>
      <Header></Header>
      <div
        className="flex flex-col mt-[76px] bg-[url('../assets/img/bg-home.png')]
          w-full
          h-[calc(100vh-90px)]
          bg-no-repeat
          lg:bg-cover
          bg-contain
          bg-top"
      >
        <div className="container !mt-3 mobile:px-2">
          <h1 className="text-2xl font-bold mb-4">Giỏ Hàng Của Bạn</h1>
          {listProducts.length === 0 ? (
            <div className="lg:text-2xl text-xl text-[#df9342] text-center">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            <div>
              {listProducts.map((item) => (
                <CardItem
                  item={item}
                  setShowDeleteModal={setShowDeleteModal}
                  setListProducts={setListProducts}
                  setDeleteProductId={setDeleteProductId}
                />
              ))}
              <div className="text-end mb-[60px]">
                <div className="my-3">
                  Tổng tiền:{" "}
                  <span className="text-red-500 font-semibold text-xl">
                    {number_to_price(totalPrice)} VND
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    className="py-2 px-4 bg-red-400 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 h-[36px]"
                    onClick={() => setShowAddModal(true)}
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <DeletePopup
          open={showDeleteModal}
          handleClose={() => {
            setShowDeleteModal(false);
            setDeleteProductId(undefined);
          }}
          content="Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?"
          handleAgree={handleAgreeDelete}
        ></DeletePopup>
        <BuyProducts
          open={showAddModal}
          handleClose={() => {
            setShowAddModal(false);
          }}
          listProducts={listProducts}
          totalPrice={totalPrice}
          shopCard={true}
        ></BuyProducts>
      </div>
    </>
  );
};

export default ShoppingCard;
