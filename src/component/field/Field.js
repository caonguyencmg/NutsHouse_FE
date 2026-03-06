import React from "react";

const Field = ({ className, children }) => {
  return (
    <div
      className={`flex flex-col gap-y-2 mx-2 mx-auto mb-4 last:mb-0 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Field;
