import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect } from "react";

const UploadImgs = ({ listImgs, fileList, setFileList }) => {
  const mapImgToUploadFile = (imgs = []) => {
    return imgs?.map((url, index) => ({
      uid: `-${index + 1}`,
      url: process.env.REACT_APP_BACKEND_URL + url,
      status: "done",
    }));
  };

  const onChange = ({ fileList: newFileList }) => {
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
      <ImgCrop rotationSlider aspect={9 / 13}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
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
