import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { number_to_price } from "../helper/common";
import { useDispatch } from "react-redux";
import { addCard } from "../reducers/userReducer";
import Slider from "react-slick";
import "./index.scss";
const ProductCard = ({
  open = false,
  handleClose = () => {},
  data,
  buyProduct = () => {},
}) => {
  const [quantity, setQuantity] = useState(1);

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 3000, // Không delay giữa các lần chạy
    pauseOnHover: true,
  };

  const dispatch = useDispatch();

  const increase = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : 20));
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleClickAddCard = () => () => {
    dispatch(
      addCard({
        id: data.id,
        quantity: quantity,
      }),
    );
    toast.success("Thêm vào giỏ hàng thành công!", {
      autoClose: 500,
    });
    setQuantity(1);
    handleClose();
  };

  if (typeof document === "undefined") return <div className="modal"></div>;
  return createPortal(
    <div
      className={`fixed top-0 w-full z-50 transition-all  ${
        open ? "" : "invisible opacity-0 "
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 cursor-pointer overlay"
        onClick={() => {
          handleClose();
          setQuantity(1);
        }}
      ></div>
      <div className="min-h-[100vh] !px-4 !py-6 md:!p-10 container">
        <div className="p-2 md:p-5 pt-0 md:w-[85%] lg:w-[70%] rounded-xl bg-white mx-auto relative z-10 ">
          <span
            onClick={() => {
              handleClose();
              setQuantity(1);
            }}
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
          <h1 className="mb-4 text-3xl font-bold text-center text-black">
            Thêm vào giỏ hàng
          </h1>
          <div className="overflow-auto md:overflow-hidden max-h-[85vh] grid md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1.7fr]  gap-6">
            <div className=" w-full rounded-md card-slider">
              <Slider ref={sliderRef} {...settings}>
                {data?.img?.map((item) => {
                  return (
                    <img
                      src={process.env.REACT_APP_BACKEND_URL + item}
                      className="rounded-md md:!w-[250px] md:!h-[330px] h-[280px]"
                      alt=""
                    />
                  );
                })}
              </Slider>
              <img
                src={process.env.REACT_APP_BACKEND_URL + data?.img}
                className="rounded-md"
                alt=""
              />
            </div>
            <div>
              <div className=" text-3xl text-gray-700 font-semibold pb-2">
                {data?.name}
              </div>
              <div className="text-red-500 text-2xl font-semibold pb-2">
                {number_to_price(data?.price)} VND
              </div>
              <div className=" text-sm text-gray-500">{data?.description}</div>

              {/* {data?.quantity == 0 ? null : ( */}
              <>
                {/* {data.quantity <= 5 && (
                    <div className="mt-4 text-xs text-gray-500 font-medium">
                      Còn: {data.quantity} sản phẩm
                    </div>
                  )} */}
                <div className="flex items-center gap-2 text-2xl mt-5">
                  <span
                    onClick={decrease}
                    className="w-10 h-10 flex items-center justify-center rounded-3xl border-2 border-gray-300 cursor-pointer select-none"
                  >
                    -
                  </span>

                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setQuantity(val >= 1 ? val : 1);
                    }}
                    className={`
                    w-14 h-10
                    text-center
                    rounded-lg
                    !border-2 !border-blue-400
                    !bg-transparent
                    focus:!border-[#df9342]

                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  `}
                  />

                  <span
                    onClick={increase}
                    className="w-10 h-10 flex items-center justify-center rounded-3xl border-2 border-gray-300 cursor-pointer select-none"
                  >
                    +
                  </span>
                </div>
              </>
              {/* )} */}

              <div className="mt-5 text-center gap-4 flex">
                {/* {data?.quantity > 0 ? ( */}
                <>
                  {" "}
                  <span
                    onClick={handleClickAddCard()}
                    className="p-2 md:p-3 md:text-lg font-semibold rounded-md !border !border-red-500 text-red-500 cursor-pointer"
                  >
                    Thêm vào giỏ hàng
                  </span>
                  <button
                    onClick={() => {
                      buyProduct(data, quantity);
                      setQuantity(1);
                    }}
                    className="p-2 md:p-3 md:text-lg font-semibold text-white rounded-md bg-red-500"
                  >
                    Mua ngay
                  </button>
                </>
                {/* ) : (
                  <div className="text-red-500 font-semibold text-2xl w-full">
                    Hết hàng
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body"),
  );
};

export default ProductCard;
