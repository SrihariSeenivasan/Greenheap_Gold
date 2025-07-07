"use client";

import styles from "./styles.module.css";
import { useEffect } from "react";


const CommonBanner = ({
  title = "All your marketing needs in one single monthly subscription",
  subTitle = "Crystal-clear hourly billing and hundreds of marketing and creative experts at your disposal. That's what you get when you sign up for thebot all-in-one marketing service.",
}) => {
  useEffect(() => {
    document.body.style.setProperty(
      "--bg-color",
      "linear-gradient(88deg,rgb(255, 255, 255) -11.16%,rgb(255, 255, 255) 46.95%,rgb(213, 248, 217) 94.89%)"
    );
  }, []);
  return (
    <div className={`container ${styles.banner_bg} common-bg`}>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
        style={{ height: "90vh" }}
      >
        <div
          className={`carousel-inner ${styles.carousel_inner} d-flex align-items-center`}
        >
          <div className={`carousel-item active`} data-bs-interval="10000">
            <div className="carousel-caption d-flex align-items-center justify-content-center">
              <div className="text-center">
                <div className={`${styles.banner_title} py-5 m-auto fadeIn`}>
                  {title}
                </div>
                <div
                  className={`m-auto ${styles.banner_sub_title} pb-5 fadeIn`}
                >
                  {subTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
