"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.css";

interface TitleBannerProps {
  title: React.ReactNode;
  fontSize?: string;
  subTitle?: string;
  introduction?: string;
  height?: string;
  showContactUs?: boolean;
  bgColor?: string;
}

const TitleBanner: React.FC<TitleBannerProps> = ({
  title,
  fontSize = "4.5rem",
  subTitle = "",
  introduction = "",
  height = "40vh",
  showContactUs = true,
  bgColor = "linear-gradient(88deg,rgb(255, 255, 255) -11.16%,rgb(255, 255, 255) 46.95%,rgb(213, 248, 217) 94.89%)",
}) => {
  useEffect(() => {
    document.body.style.setProperty("--bg-color", bgColor);
  }, [bgColor]);
  return (
    <div className={`container ${styles.banner_bg} common-bg`}>
      <div
        id="carouselExampleDark"
        className={`carousel carousel-dark slide ${styles.title_bar_container} d-flex align-items-center`}
        style={{ height: height ? height : "100vh" }}
      >
        <div
          className={`carousel-inner ${styles.carousel_inner} row d-flex align-items-center m-auto`}
        >
          <div className={`carousel-item active`} data-bs-interval="10000">
            <div className="carousel-caption d-flex align-items-center justify-content-center m-auto">
              <div className="text-center col-md-8 col-sm-12">
                <div
                  className={`${styles.banner_title} m-auto pink_text`}
                  style={{ fontSize: fontSize }}
                >
                  {title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subTitle && (
        <>
          <hr className="mt-4 mb-4" />
          <div
            className={`w-50 text-white ${styles.banner_sub_title} m-auto py-3`}
          >
            <h2 className="text-center pink_text">{subTitle}</h2>
          </div>
        </>
      )}
      {introduction && (
        <>
          <div className="text-center text-white">{introduction}</div>
          <hr className="mt-4 mb-4" />
        </>
      )}
    </div>
  );
};

export default TitleBanner;
