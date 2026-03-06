import { useDispatch } from "react-redux";
import { number_to_price } from "../helper/common";
import { editCard } from "../reducers/userReducer";

const CardItem = ({
  item,
  setShowDeleteModal = () => {},
  setListProducts = () => {},
  setDeleteProductId = () => {},
}) => {
  const dispatch = useDispatch();

  const increase = (id) => {
    setListProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.quantity >= 20) return item;

        const newQuantity = item.quantity + 1;

        // update Redux ngay tại đây
        dispatch(editCard({ id, quantity: newQuantity }));

        return { ...item, quantity: newQuantity };
      }),
    );
  };

  const decrease = (id) => {
    setListProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.quantity <= 1) return item;

        const newQuantity = item.quantity - 1;

        // update Redux ngay tại đây
        dispatch(editCard({ id, quantity: newQuantity }));

        return { ...item, quantity: newQuantity };
      }),
    );
  };

  const handleInputQuantity = (id, val) => {
    setListProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        let newQuantity = val;
        if (val <= 1) {
          newQuantity = 1;
        }
        if (val >= 20) {
          newQuantity = 20;
        }

        // update Redux ngay tại đây
        dispatch(editCard({ id, quantity: newQuantity }));

        return { ...item, quantity: newQuantity };
      }),
    );
  };

  const handleDeleteProduct = async (id) => {
    setShowDeleteModal(true);
    setDeleteProductId(id);
  };

  return (
    <>
      <div
        className="p-2 border border-gray-300 mb-4 items-center rounded-lg grid lg:gap-x-5 gap-x-2 lg:grid-cols-[0.3fr_8fr_0.8fr]  grid-cols-[1fr_4fr_1fr]"
        key={item.id}
      >
        <div className="min-w-[64px] w-full xl:max-h-[76px]  flex items-center justify-center overflow-hidden">
          <img
            src={process.env.REACT_APP_BACKEND_URL + item?.img[0]}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="lg:grid lg:gap-x-5 gap-x-1 grid-cols-[5fr_1.6fr_1.5fr] items-center">
          <div>
            <div className=" text-gray-700 font-semibold">{item?.name}</div>
            <div className="line-clamp-2 text-[12px] mobile:hidden text-gray-500">
              {item?.description}
            </div>
          </div>
          <div className="min-w-[180px]">
            <div>
              Đơn giá:
              <span className="text-blue-500 font-semibold">
                {" " + number_to_price(item?.price || 0)} VND
              </span>
            </div>
            <div className="flex text-gray-500 h-10 items-center">
              Số lượng:
              <div className="flex items-center gap-2 text-lg ml-2">
                <span
                  onClick={() => decrease(item?.id)}
                  className="w-6 h-6 flex items-center justify-center rounded-3xl border-2 border-gray-300 cursor-pointer select-none"
                >
                  -
                </span>

                <input
                  type="number"
                  min={1}
                  value={item?.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    handleInputQuantity(item?.id, val);
                  }}
                  className="
                    w-8 h-7
                    text-center
                    rounded-lg
                    !border-2 !border-blue-400
                    !bg-transparent
                    focus:!border-[#df9342]

                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />

                <span
                  onClick={() => increase(item?.id)}
                  className="w-6 h-6 flex items-center justify-center rounded-3xl border-2 border-gray-300 cursor-pointer select-none"
                >
                  +
                </span>
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
        <button
          className="p-2 bg-red-400 rounded-md text-white flex items-center gap-2 justify-center hover:bg-red-600 col-start-3 row-start-1 row-end-3 h-[36px]"
          onClick={() => handleDeleteProduct(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-5 h-5 mobile:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Xoá
        </button>
      </div>
    </>
  );
};

export default CardItem;
