import CustomImage from "../../components/custom/Image";

const features = [
  { icon: "/assets/delivery.png", title: "Delivery" },
  { icon: "/assets/sip.png", title: "SIP" },
  { icon: "/assets/icons/gift.png", title: "Gift" },
];

const whyChoose = [
  {
    icon: "/assets/guarantee.png",
    title: "Guaranteed 24K Gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/sell.png",
    title: "Sell anytime from home",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/income.png",
    title: "Earn income on gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/safety.png",
    title: "Safety Guaranteed",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/convert.png",
    title: "Convert to physical gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/lowprice.png",
    title: "Buy as low as Rs10",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
];

const testimonials = [
  {
    name: "Admin",
    location: "chennai",
    img: "/assets/user.png",
    text:
      "I had an amazing experience purchasing from Greenheap! The craftsmanship is exquisite, and each piece truly stands out. Their customer service was exceptional, guiding me through every step. I felt valued as a customer and will definitely return for future purchases.",
  },
  {
    name: "Admin",
    location: "chennai",
    img: "/assets/user.png",
    text:
      "Purchasing from goldheapgold was a delightful experience! The designs are unique, and the quality of gold is exceptional. I received my order on time, beautifully packaged. Highly recommended!",
  },
  {
    name: "Admin",
    location: "chennai",
    img: "/assets/user.png",
    text:
      "I had an amazing experience purchasing from Greenheap! The craftsmanship is exquisite, and each piece truly stands out. Their customer service was exceptional, guiding me through every step. I felt valued as a customer and will definitely return for future purchases.",
  },
];

const faqs = [
  { q: "testing", a: "test" },
  { q: "How do I buy gold?", a: "You can buy gold through our platform using various payment methods." },
];

const partners = [
  { src: "/assets/amazonpay.png", alt: "Amazon Pay" },
  { src: "/assets/axisbank.png", alt: "Axis Bank" },
  { src: "/assets/caratalane.png", alt: "Caratlane" },
  { src: "/assets/tanishq.png", alt: "Tanishq" },
  { src: "/assets/phonepe.png", alt: "PhonePe" },
];

const AboutUsPage = () => {
  return (
    <div>
      {/* Banner */}
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
        <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "2.8rem", zIndex: 2 }}>About Us</h1>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Intro Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
              Get access to the safest way of procuring... <br />
              <span style={{ color: "#7a1335" }}>24K Gold / Silver</span>
            </h2>
            <div className="mb-4" style={{ fontSize: "1.1rem" }}>
              We at Digital Gold want to make your gold journey simple, transparent and trustworthy so that you can get the optimum output of your savings.&nbsp;
            </div>
            <div className="d-flex gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="text-center border rounded py-4 px-4"
                  style={{
                    minWidth: 110,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    border: "1px solid #f0e3d1",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#f9e9c7",
                      margin: "0 auto",
                    }}
                  >
                    <CustomImage src={f.icon} width={28} height={28} alt={f.title} />
                  </div>
                  <div className="fw-semibold mt-2" style={{ color: "#7a1335" }}>{f.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 mt-4 mt-md-0 d-flex justify-content-center">
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                background: "#fff",
                maxWidth: 340,
                width: "100%",
              }}
            >
              <CustomImage
                src="/assets/gold-plant.jpg"
                alt="Gold Plant"
                width={340}
                height={240}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ background: "#f7eded" }}>
        <div className="container py-5">
          <div className="text-center mb-4">
            <div style={{ color: "#7a1335", fontWeight: 700, fontSize: "1.2rem" }}>
              <span style={{ fontSize: 24, verticalAlign: "middle" }}>{"\u2728"}</span>
            </div>
            <h3 className="fw-bold" style={{ fontSize: "2rem" }}>Why Choose Us?</h3>
          </div>
          <div className="row g-4">
            {whyChoose.map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="bg-white rounded shadow-sm p-4 h-100">
                  <CustomImage src={item.icon} alt={item.title} width={40} height={40} />
                  <div className="fw-bold mt-3 mb-1">{item.title}</div>
                  <div style={{ color: "#555" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <div style={{ color: "#7a1335", fontWeight: 700, fontSize: "1.2rem" }}>
            <span style={{ fontSize: 24, verticalAlign: "middle" }}>{"\u2728"}</span>
          </div>
          <h3 className="fw-bold" style={{ fontSize: "2rem" }}>Clients Say's?</h3>
        </div>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="bg-white rounded shadow-sm p-4 h-100">
                <div className="d-flex align-items-center mb-2">
                  <CustomImage src={t.img} alt={t.name} width={48} height={48} style={{ borderRadius: "50%" }} />
                  <div className="ms-3">
                    <div className="fw-bold">{t.name}</div>
                    <div style={{ color: "#888", fontSize: "0.95rem" }}>{t.location}</div>
                  </div>
                </div>
                <div style={{ color: "#333" }}>{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#991616" }}>
        <div className="container py-5">
          <div className="text-center mb-4">
            <img src="/assets/faq-decor.svg" alt="" style={{ height: 22, marginBottom: 8 }} />
            <h3 className="fw-bold" style={{ fontSize: "2rem", color: "#fff" }}>Frequently Asked Questions</h3>
          </div>
          <div className="row justify-content-center g-4">
            {faqs.map((faq, idx) => (
              <div className="col-md-6" key={idx}>
                <div
                  className="faq-question bg-white rounded-3 d-flex align-items-center justify-content-between px-4 py-3 mb-3"
                  style={{
                    minHeight: 56,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#222",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "box-shadow 0.2s",
                  }}
                  tabIndex={0}
                  onMouseEnter={e => {
                    const ans = (e.currentTarget.nextSibling as HTMLElement);
                    if (ans) {
                      ans.style.display = "flex";
                      const arrow = e.currentTarget.querySelector('.faq-arrow') as HTMLElement;
                      if (arrow) arrow.style.transform = "rotate(180deg)";
                    }
                  }}
                  onMouseLeave={e => {
                    const ans = (e.currentTarget.nextSibling as HTMLElement);
                    if (ans) {
                      ans.style.display = "none";
                      const arrow = e.currentTarget.querySelector('.faq-arrow') as HTMLElement;
                      if (arrow) arrow.style.transform = "rotate(0deg)";
                    }
                  }}
                  onFocus={e => {
                    const ans = (e.currentTarget.nextSibling as HTMLElement);
                    if (ans) {
                      ans.style.display = "flex";
                      const arrow = e.currentTarget.querySelector('.faq-arrow') as HTMLElement;
                      if (arrow) arrow.style.transform = "rotate(180deg)";
                    }
                  }}
                  onBlur={e => {
                    const ans = (e.currentTarget.nextSibling as HTMLElement);
                    if (ans) {
                      ans.style.display = "none";
                      const arrow = e.currentTarget.querySelector('.faq-arrow') as HTMLElement;
                      if (arrow) arrow.style.transform = "rotate(0deg)";
                    }
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="faq-arrow"
                    style={{
                      fontSize: 22,
                      color: "#991616",
                      transition: "transform 0.2s, color 0.2s",
                      display: "inline-block",
                      transform: "rotate(0deg)",
                    }}
                  >&#8593;</span>
                </div>
                <div
                  className="faq-answer bg-white rounded-3 align-items-center justify-content-between px-4 py-3 mb-3"
                  style={{
                    minHeight: 48,
                    fontSize: 15,
                    color: "#991616",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    display: "none",
                    position: "relative",
                    zIndex: 2,
                    marginTop: "-12px",
                  }}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <div style={{ color: "#7a1335", fontWeight: 700, fontSize: "1.2rem" }}>
            <span style={{ fontSize: 24, verticalAlign: "middle" }}>{"\u2728"}</span>
          </div>
          <h3 className="fw-bold" style={{ fontSize: "2rem" }}>Our Trusted Partners</h3>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
          {partners.map((p, idx) => (
            <CustomImage key={idx} src={p.src} alt={p.alt} width={120} height={40} style={{ objectFit: "contain" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;