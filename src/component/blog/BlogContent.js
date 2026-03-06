import React from "react";

const BlogContent = ({ title, url, contentClass, titleClass, content }) => {
  return (
    <div className="cursor-pointer">
      <div>
        <div className={`${titleClass} text-xl font-medium mb-1`}>{title}</div>
      </div>
      <div>
        <div
          className={`${contentClass} text-sm mb-1`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <div v-show={url}>
        <img
          className="object-cover w-full h-full my-2 rounded-lg cursor-pointer"
          src={url}
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogContent;
