import React from "react";
import { LoadingSpinner } from "../loading";

const Button = ({
  type = "button",
  onClick = () => {},
  className,
  children,
  ...props
}) => {
  const { isLoading } = props;
  return (
    <button
      className={`p-2 md:p-3 md:text-lg font-semibold text-white rounded-3xl w bg-gradient-to-r from-primary to-secondary ${
        className || ""
      } ${isLoading ? "opacity-70" : ""}`}
    >
      {isLoading ? <LoadingSpinner></LoadingSpinner> : children}
    </button>
  );
};

export default Button;
