import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../component/layout/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <NavLink to={"/home"} className="">
          <img
            className="inline-block mb-2 md:mb-10 w-[200px] md:w-[300px] h-[200px] md:h-[300px]"
            src="/logo.png"
            alt="not found"
          />
        </NavLink>
        <h1 className="mb-6 md:mb-10 text-3xl md:text-5xl font-bold">
          Oops! Page not found
        </h1>
        <NavLink
          to="/"
          className="inline-block px-8 py-4 font-medium text-white rounded-xl bg-primary"
        >
          {" "}
          Back to Home
        </NavLink>
      </div>
    </>
  );
};

export default NotFoundPage;
