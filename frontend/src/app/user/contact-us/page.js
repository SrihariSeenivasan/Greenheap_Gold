import React from "react";

const ContactUsPage = () => {
  return (
    <div>
      {/* Top Banner */}
      <div
        style={{
          background: "url('/home/banner 2.png') center center/cover no-repeat",
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "2.8rem", zIndex: 2 }}>Contact Us</h1>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Info Row */}
      <div className="container py-5">
        <div className="row text-center mb-5" style={{ borderBottom: "1px solid #eee" }}>
          <div className="col-md-4 mb-4 mb-md-0">
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#7a1335",
                color: "#fff",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 24,
                marginBottom: 10
              }}>
                <i className="fa fa-map-marker"></i>
              </span>
            </div>
            <div className="fw-bold">Office Address</div>
            <div style={{ fontSize: "0.98rem", color: "#222" }}>
              No. 1/PL922, 66th Street, 11th Sector Kalaignar Karunanidhi Nagar
            </div>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#7a1335",
                color: "#fff",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 24,
                marginBottom: 10
              }}>
                <i className="fa fa-phone"></i>
              </span>
            </div>
            <div className="fw-bold">Contact Us</div>
            <div style={{ fontSize: "0.98rem", color: "#222" }}>+91 81900 59995</div>
          </div>
          <div className="col-md-4">
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#7a1335",
                color: "#fff",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 24,
                marginBottom: 10
              }}>
                <i className="fa fa-thumbs-up"></i>
              </span>
            </div>
            <div className="fw-bold">Follow Us</div>
            <div className="d-flex justify-content-center gap-2 mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook text-danger"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram text-danger"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play text-danger"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin text-danger"></i></a>
            </div>
          </div>
        </div>

        {/* Form and Side Image */}
        <div className="row align-items-center" style={{ background: "#fff6f2", borderRadius: 16, position: "relative", minHeight: 350 }}>
          <div className="col-lg-7 py-5">
            <form className="bg-white rounded shadow-sm p-4" style={{ maxWidth: 600, margin: "0 auto" }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name <span style={{ color: "red" }}>*</span></label>
                  <input type="text" className="form-control" placeholder="First Name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Second Name <span style={{ color: "red" }}>*</span></label>
                  <input type="text" className="form-control" placeholder="Second Name" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email <span style={{ color: "red" }}>*</span></label>
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone <span style={{ color: "red" }}>*</span></label>
                  <input type="text" className="form-control" placeholder="Phone" required />
                </div>
                <div className="col-12">
                  <label className="form-label">Requirement (Optional)</label>
                  <textarea className="form-control" rows={3} placeholder="Type message"></textarea>
                </div>
              </div>
              <button type="submit" className="btn mt-3" style={{ background: "#7a1335", color: "#fff", fontWeight: 600 }}>
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-5 d-none d-lg-block" style={{ position: "absolute", right: 0, bottom: 0, top: 0, zIndex: 1 }}>
            <img
              src="/assets/contact-side.png"
              alt="Contact Side"
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
              }}
            />
          </div>
        </div>

        {/* Google Map */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="rounded overflow-hidden" style={{ border: "2px solid #eee" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.25882327426!2d80.1805!3d13.0477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52613e7b7c1e1d%3A0x7e6e7e7e7e7e7e7e!2sChennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
