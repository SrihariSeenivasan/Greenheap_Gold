import CustomImage from "../custom/Image";
import style from "./styles.module.css";
import logoStyle from "../NavBar/styles.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{
        background: `url('/assets/footerb.png') center center/cover no-repeat, #fffbe9`,
        position: "relative",
      }}
    >
      <div className="container py-5">
        <div className="row">
          {/* About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="mb-3">
              <CustomImage
                src="/assets/green.png" // sample logo
                wrapperClss={`${logoStyle.logo_img_container} m-0 pb-3`}
                height="75px"
                width="100px"
                alt="Logo"
              />
            </div>
            <div style={{ fontSize: "1.1rem", color: "#222" }}>
              Our organization offers a structured and transparent approach of
              purchasing and accumulating 24K gold through digital and easy
              conversion to physical gold. Full compliance with all relevant
              laws and regulations.
            </div>
          </div>
          {/* Useful Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div
              style={{
                color: "#7a1335",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              Useful Links
            </div>
            <ul
              className="list-unstyled mt-3"
              style={{ fontSize: "1.05rem" }}
            >
              <li>
                <Link
                  href="/about-us"
                  className="text-dark text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-condition"
                  className="text-dark text-decoration-none"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-dark text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-cancellation"
                  className="text-dark text-decoration-none"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-dark text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div
              style={{
                color: "#7a1335",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              Contact Us
            </div>
            <div className="mt-3" style={{ fontSize: "1.05rem" }}>
              <div className="mb-2">
                <i
                  className="fa fa-map-marker me-2"
                  style={{ color: "#7a1335" }}
                ></i>
                No. 1/PL922, 66th Street, 11th Sector,
                <br />
                Kalaignar Karunanidhi Nagar,
                <br />
                Tamil Nadu, Chennai, India.
              </div>
              <div className="mb-2">
                <i
                  className="fa fa-envelope-o me-2"
                  style={{ color: "#7a1335" }}
                ></i>
                spprtgreenheapdigigold@gmail.com
              </div>
              <div>
                <i
                  className="fa fa-phone-square me-2"
                  style={{ color: "#7a1335" }}
                ></i>
                +91 81900 59995
              </div>
            </div>
          </div>
          {/* Follow Us */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div
              style={{
                color: "#7a1335",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              Follow Us
            </div>
            <div className="d-flex align-items-center gap-3 mt-3 mb-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#7a1335",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa fa-facebook text-white fs-5"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#7a1335",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa fa-instagram text-white fs-5"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#7a1335",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa fa-linkedin text-white fs-5"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#7a1335",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa fa-youtube-play text-white fs-5"></i>
              </a>
            </div>
            <div className="d-flex gap-2 mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/black-play-img.png"
                  alt="Google Play"
                  style={{ height: 40 }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/black-store-img.png"
                  alt="App Store"
                  style={{ height: 40 }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918190059995"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 9999,
        }}
      >
        <i
          className="fa fa-whatsapp"
          style={{ fontSize: "2.5rem", color: "#25D366" }}
        ></i>
      </a>
      {/* Copyright */}
      <div
        style={{
          background: "#7a1335",
          color: "#fff",
          textAlign: "center",
          padding: "12px 0",
          fontSize: "1.05rem",
        }}
      >
        © 2024 Greenheap Gold And Silver Jewellery Private Limited.
      </div>
    </footer>
  );
};

export default Footer;
