import styles from "./styles.module.css";

import CustomImage from "../Image";

const SectionWithImage = ({
  imgSrc = "/world.png",
  title = "Why Choose Us?",
  content = "",
}) => {
  return (
    <div>
      <div className="d-flex g-5 align-items-center">
        <div className={styles.image_container}>
          <CustomImage src={imgSrc} />
        </div>
        <div className={`text-white ${styles.content_section} ps-5`}>
          <div className={styles.content_section_title}>
            <h1 className="fs-1 m-auto pb-2 fw-bolder">{title}</h1>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default SectionWithImage;
