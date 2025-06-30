import { headers } from "next/headers";
import CustomImage from "../custom/Image";
import styles from "./styles.module.css";
import Link from "next/link";
import CustomButton from "../custom/CustomButton";

export const MENU = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "about-us",
  },
  {
    name: "Buy Ornaments",
    link: "buy-ornaments",
  },
  {
    name: "Contact Us",
    link: "contact-us",
  },
];

const NavBar = async () => {
  const headersList = await headers();
  return (
    <div>
      <div className={`${styles.top_nav}`}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-sm-between justify-content-between ">
            <div className="text-white d-sm-block d-none d-sm-flex align-items-center justify-content-md-start  justify-content-sm-center  gap-sm-1 gap-md-3">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <i class="fa fa-phone-square pe-2 fs-4" aria-hidden="true"></i>
                <a
                  className="text-white m-0 fw-normal"
                  href="tel:++91 81900 59995"
                  data-rel="external"
                  rel="noreferrer"
                >
                  <h6 class="text-wrap lh-base m-0">+91 81900 59995</h6>
                </a>
              </div>
              <div className="d-flex align-items-center justify-content-start gap-2">
                <i class="fa fa-envelope-o pe-2 fs-4" aria-hidden="true"></i>
                <a
                  className="text-white fw-normal"
                  href="mailto:spprtgreenheapdigigold@gmail.com"
                  data-rel="external"
                  rel="noreferrer"
                >
                  <h6 class="text-wrap lh-base m-0">
                    spprtgreenheapdigigold@gmail.com
                  </h6>
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-sm-start gap-md-3 gap-sm-2 gap-2 ">
              <Link href="#" className={`pe-2`} target="_blank">
                <i
                  className={`fa fa-2x fa-facebook ${styles.share_button}`}
                ></i>
              </Link>
              <Link href="#" className={`px-2`} target="_blank">
                <i
                  className={`fa fa-2x fa-instagram ${styles.share_button}`}
                ></i>
              </Link>
              <Link href="#" className={`px-2`} target="_blank">
                <i
                  className={`fa fa-2x fa-twitter ${styles.share_button}`}
                ></i>
              </Link>
               <Link href="#" className={`px-2`} target="_blank">
                <i
                  className={`fa fa-2x fa-youtube ${styles.share_button}`}
                ></i>
              </Link>
               <Link href="#" className={`px-2`} target="_blank">
                <i
                  className={`fa fa-2x fa-linkedin ${styles.share_button}`}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar bg-white navbar-expand-sm sticky-top">
        <div className="container d-flex align-items-center">
          <Link href="/">
            <div
              className="navbar-brand"
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
            >
              <CustomImage
                src={"/logo.png"}
                wrapperClss={styles.logo_img_container}
                height="auto"
                width="8vw"
              />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navBarMenu"
            aria-controls="navBarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navBarMenu"
          >
            <ul className="navbar-nav  mx-auto my-2 my-lg-0 navbar-nav-scroll">
              {MENU.map((menuItem, menuIdx) => {
                return (
                  <li className="nav-item px-1" key={`menu-${menuIdx}`}>
                    <Link
                      className="nav-link nav-dropdown-item"
                      href={`${menuItem.link}`}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 justify-content-end align-items-end gap-4">
              <li className="nav-item px-1 cursor-pointer">
                <CustomButton title={`Become Partner`} className="px-3 py-1" />
              </li>
              <li className="nav-item px-1 cursor-pointer">
                <CustomButton
                  title={`Login /  Sign Up`}
                  className="px-2 py-1"
                  icon={<i class="fa fa-sign-in me-2" aria-hidden="true"></i>}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
