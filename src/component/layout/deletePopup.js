import React from "react";

import { createPortal } from "react-dom";
import "./index.scss";

const DeletePopup = ({
  open = false,
  handleClose = () => {},
  handleAgree = () => {},
  content = "You want to delete this item ?",
}) => {
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
        <div className="p-5 pt-0 w-[95%] md:w-[50%] rounded-xl bg-white mx-auto relative z-10 ">
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
          <div className="text-center font-semibold text-xl md:text-xl text-red-500 pt-5">
            {content}
          </div>
          <div className="flex justify-end mt-5 gap-5">
            <button
              onClick={handleAgree}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Xác nhận
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-all"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default DeletePopup;
