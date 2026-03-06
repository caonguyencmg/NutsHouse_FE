import React from "react";

const Label = ({ htmlFor = "", children, className, ...props }) => {
  return (
    <label
      className={`flex justify-start font-medium mobile:text-sm cursor-pointer ${
        className || ""
      }`}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
