import React from "react";

const BlogUser = ({ avatar, nameUser, time }) => {
  return (
    <div className="flex gap-4 mb-[1rem]">
      <div className="items-center">
        <img
          className="w-[3rem] h-[3rem] rounded-full"
          src={avatar}
          alt=""
        />
      </div>
      <div>
        <div className="cursor-pointer">{nameUser}</div>
        <div className="text-xs transition-all cursor-pointer hover:text-blue-400">
          {time}
        </div>
      </div>
    </div>
  );
};

export default BlogUser;
