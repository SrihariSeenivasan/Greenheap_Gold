import Image from "next/image";
import styles from "./styles.module.css";

const CustomImage = ({
  src,
  width = "100vw",
  height = "100vh",
  alt = "Template Image",
  wrapperClss = "",
  layout = "responsive",
  fill = false,
  imgClass = "",
}) => {
  let customProps = {};
  if (fill) {
    customProps["fill"] = true;
  } else {
    customProps["width"] = 0;
    customProps["height"] = 0;
    customProps["layout"] = layout;
  }
  return (
    <div
      className={`${styles.img_container} ${wrapperClss}`}
      // style={{
      //   height: height,
      //   width: width,
      // }}
    >
      <Image
        src={src}
        className={`d-block w-100 ${imgClass}`}
        alt={alt}
        {...customProps}
      />
    </div>
  );
};

export default CustomImage;
