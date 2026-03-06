import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "addCard",
  initialState: {
    shoppingCard: Number(localStorage.getItem("shoppingCard")) || 0,
    cardInfo: JSON.parse(localStorage.getItem("cardInfo") || "[]"),
  },
  reducers: {
    addCard: (state, { payload }) => {
      if (!payload) return;

      const cardList = Array.isArray(state.cardInfo) ? [...state.cardInfo] : [];

      const index = cardList.findIndex((item) => item.id === payload.id);

      if (index !== -1) {
        // Đã tồn tại → cộng số lượng
        cardList[index].quantity += payload.quantity;
      } else {
        // Chưa tồn tại → thêm loại mới
        cardList.push(payload);
      }

      state.cardInfo = cardList;

      // SỐ LƯỢNG LOẠI SẢN PHẨM
      state.shoppingCard = cardList.length;

      window.localStorage.setItem("shoppingCard", String(cardList.length));
      window.localStorage.setItem("cardInfo", JSON.stringify(cardList));
    },
    editCard: (state, { payload }) => {
      if (!payload) return;

      const cardList = Array.isArray(state.cardInfo) ? [...state.cardInfo] : [];

      const index = cardList.findIndex((item) => item.id === payload.id);

      if (payload.quantity === 0) {
        if (index !== -1) {
          cardList.splice(index, 1);
        }
      } else {
        if (index !== -1) {
          // Đã tồn tại → sửa lại số lượng
          cardList[index].quantity = payload.quantity;
        } else {
          // Chưa tồn tại → thêm loại mới
          cardList.push(payload);
        }
      }

      state.cardInfo = cardList;

      // SỐ LƯỢNG LOẠI SẢN PHẨM
      state.shoppingCard = cardList.length;

      window.localStorage.setItem("shoppingCard", String(cardList.length));
      window.localStorage.setItem("cardInfo", JSON.stringify(cardList));
    },
    deleteAll: (state) => {
      // Xóa toàn bộ danh sách sản phẩm
      state.cardInfo = [];

      // Số lượng loại sản phẩm = 0
      state.shoppingCard = 0;

      // Đồng bộ localStorage
      window.localStorage.removeItem("cardInfo");
      window.localStorage.setItem("shoppingCard", "0");
    },
  },
});

export const { addCard, editCard, deleteAll } = userSlice.actions;
export default userSlice.reducer;
