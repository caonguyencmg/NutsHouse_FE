import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import { getListProduct } from "../service/productService";
import BuyProducts from "./BuyProducts";
import ProductCard from "./productCard";
import { number_to_price } from "../helper/common";

const HomePage = () => {
  const [productCard, setProductCard] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [dataBuyProduct, setDataBuyProduct] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const getListProducts = async () => {
    let response = await getListProduct();
    if (response && response.statusCode === 200) {
      const products = response.products.map((item) => ({
        ...item,
        img: JSON.parse(item.img),
      }));
      setListProducts(products);
    }
  };

  const handleShowCard = (data) => {
    setProductCard(data);
    setShowCardModal(true);
  };

  useEffect(() => {
    // getData();
    getListProducts();
  }, []);

  return (
    <div>
      <Header></Header>
      <ProductCard
        data={productCard}
        open={showCardModal}
        handleClose={() => {
          setShowCardModal(false);
        }}
        buyProduct={(data, quantity) => {
          setShowCardModal(false);
          setTimeout(() => {
            setShowAddModal(true);
          }, 100);
          setDataBuyProduct([{ ...data, quantity: quantity }]);
        }}
      ></ProductCard>
      <BuyProducts
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
        totalPrice={dataBuyProduct[0]?.price * dataBuyProduct[0]?.quantity}
        listProducts={dataBuyProduct}
      ></BuyProducts>

      <div className="w-full md:p-5 pt-4 mt-[76px] bg-[url('../assets/img/bg-home.png')] bg-no-repeat bg-contain bg-top">
        <div className="grid md-mobile:grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 container gap-4 md:!px-5">
          {listProducts.length > 0 &&
            listProducts.map((item) => (
              <div
                className="min-h-[100px] md-mobile:m-auto"
                onClick={() => handleShowCard(item)}
              >
                <div
                  className=" overflow-hidden bg-white group max-w-sm p-4 border rounded-lg shadow cursor-pointer
                "
                >
                  <div className="relative bg-gray-300 aspect-[200/240] rounded mb-4 overflow-hidden">
                    <img
                      className=" object-cover
                      transition-transform duration-300
                      group-hover:scale-110"
                      src={process.env.REACT_APP_BACKEND_URL + item?.img[0]}
                      alt=""
                    />
                    <div
                      className="absolute inset-0 bg-black/20
                    lg:opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                    flex items-end pb-3 justify-center gap-2"
                    >
                      <button
                        className="lg:px-4 px-2 py-2 bg-blue-400 text-white text-sm font-semibold
                        rounded-md shadow
                        transition-all duration-200
                        hover:bg-blue-600"
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className="md:px-4 px-2 py-2 bg-red-500 text-white text-sm font-semibold
                        rounded-md shadow
                        transition-all duration-200
                        hover:bg-red-600"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                  <div className=" text-normal text-gray-700 font-semibold">
                    {item?.name}
                  </div>
                  <div className="text-red-500 text-xl font-semibold">
                    {number_to_price(item?.price)} VND
                  </div>
                  <div className="line-clamp-3 text-[12px] text-gray-500">
                    {item?.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
