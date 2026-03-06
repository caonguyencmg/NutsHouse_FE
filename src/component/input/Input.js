import React, { Children } from "react";
import { useController } from "react-hook-form";

const Input = ({
  type = "text",
  className,
  name,
  placeholder,
  hasIcon = false,
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div
      className="relative"
      // hasIcon={children ? true : false}
    >
      <input
        className={`w-full font-medium mobile:text-sm transition-all bg-gray-200 rounded-lg  p-3 ${
          className || ""
        } ${children ? "pr-[50px]" : ""}`}
        id={name}
        type={type}
        {...field}
        {...props}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default Input;
