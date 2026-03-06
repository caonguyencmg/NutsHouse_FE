import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect } from "react";
import { useState } from "react";
import "antd/dist/antd.css";
const UploadImgs = ({ listImgs }) => {
  const [fileList, setFileList] = useState([]);

  const mapImgToUploadFile = (imgs = []) => {
    return imgs?.map((url, index) => ({
      uid: `-${index + 1}`,
      url: process.env.REACT_APP_BACKEND_URL + url,
    }));
  };

  const onChange = ({ fileList: newFileList }) => {
    console.log("🚀 ~ onChange ~ newFileList:", newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    setFileList(mapImgToUploadFile(listImgs));
  }, [listImgs]);
  return (
    <div className="antd-upload-scope">
      <ImgCrop rotationSlider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default UploadImgs;
