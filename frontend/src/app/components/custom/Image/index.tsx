import React from "react";
// Remove next/image, use standard img for React+Vite
import styles from "./styles.module.css";

interface CustomImageProps {
  src: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  wrapperClss?: string;
  imgClass?: string;
  style?: React.CSSProperties;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  width = "100vw",
  height = "100vh",
  alt = "Template Image",
  wrapperClss = "",
  imgClass = "",
  style = {},
}) => {
  return (
    <div
      className={`${styles.img_container} ${wrapperClss}`}
      style={{ width, height, ...style }}
    >
      <img
        src={src}
        className={`d-block w-100 ${imgClass}`}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default CustomImage;

