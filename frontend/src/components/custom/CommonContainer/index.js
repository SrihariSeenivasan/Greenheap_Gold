import CustomImage from "../Image";
import styles from "./styles.module.css";

const CommonContainer = ({
  title = "No Contracts. No Hidden Fees. 100% Focused on Growth.",
}) => {
  return (
    <div className="container pb-5">
      <div className={`${styles.common_container_bg} fadeIn`}>
        <div className="d-flex align-items-center justify-content-center">
          <div className="text-center text-white fs-1 fw-bolder">{title}</div>
        </div>
        <div className="text-center text-white fs-3">
          Let’s Grow Your Business!
        </div>
        {/* <div className={styles.common_img_container}> */}
        <CustomImage
          src={"/bulb.png"}
          wrapperClss={styles.common_img_container}
          imgClass="h-100"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CommonContainer;
