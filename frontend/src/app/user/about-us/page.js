import Image from "next/image";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  // const product = await fetchPosts();
  return {
    title: "About Us ",
    description:
      "Have questions or need help? Get in touch with The Bot Agency’s team for inquiries, consultations, or support. We're here to help you grow your business.",
    keywords: "About The Bot Agency",
  };
}

const features = [
  { icon: "/assets/delivery.png", title: "Delivery" },
  { icon: "/assets/sip.png", title: "SIP" },
  { icon: "/assets/gift.png", title: "Gift" },
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
                <div key={i} className="text-center border rounded py-3 px-4" style={{ minWidth: 110 }}>
                  <Image src={f.icon} alt={f.title} width={40} height={40} />
                  <div className="fw-semibold mt-2">{f.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
            <Image
              src="/assets/gold-plant.jpg"
              alt="Gold Plant"
              width={350}
              height={250}
              style={{ borderRadius: 16, objectFit: "cover", width: "100%", height: "auto" }}
            />
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
                  <Image src={item.icon} alt={item.title} width={40} height={40} />
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
                  <Image src={t.img} alt={t.name} width={48} height={48} style={{ borderRadius: "50%" }} />
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
      <div style={{ background: "#7a1335" }}>
        <div className="container py-5">
          <div className="text-center mb-4">
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem" }}>
              <span style={{ fontSize: 24, verticalAlign: "middle" }}>{"\u2728"}</span>
            </div>
            <h3 className="fw-bold" style={{ fontSize: "2rem", color: "#fff" }}>Frequently Asked Questions</h3>
          </div>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded={idx === 0 ? "true" : "false"}
                    aria-controls={`collapse${idx}`}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={`accordion-collapse collapse${idx === 0 ? " show" : ""}`}
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{faq.a}</div>
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
            <Image key={idx} src={p.src} alt={p.alt} width={120} height={40} style={{ objectFit: "contain" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
