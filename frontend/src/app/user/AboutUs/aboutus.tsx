import React, { useState, useRef, useEffect } from "react";
import CustomImage from "../../components/custom/Image";

const features = [
  { icon: "/assets/delivery.png", title: "Delivery" },
  { icon: "/assets/sip.png", title: "SIP" },
  { icon: "/assets/gigt.png", title: "Gift" },
];

const whyChoose = [
  {
    icon: "/assets/0.png",
    title: "Guaranteed 24K Gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/1.png",
    title: "Sell anytime from home",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/2.png",
    title: "Earn income on gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/3.png",
    title: "Safety Guaranteed",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/4.png",
    title: "Convert to physical gold",
    desc: "Unlike local vendors, with Safe Gold you directly buy form the manufacturer",
  },
  {
    icon: "/assets/5.png",
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
  { src: "/assets/amazon.png", alt: "Amazon Pay" },
  { src: "/assets/axis.png", alt: "Axis Bank" },
  { src: "/assets/cart.png", alt: "Caratlane" },
  { src: "/assets/tanis.png", alt: "Tanishq" },
  { src: "/assets/phonepe.png", alt: "PhonePe" },
];

// Gentle scroll fade-in hook with direction
function useScrollFadeIn(threshold = 0.15, yOffset = 40, xOffset = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible
        ? "none"
        : `translateY(${yOffset}px) translateX(${xOffset}px)`,
      transition:
        "opacity 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1)",
      willChange: "opacity, transform",
    },
  };
}

const AboutUsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll fade-in hooks for each section
  const bannerFade = useScrollFadeIn(0.1, 24);
  // Left fade for intro section
  const introFade = useScrollFadeIn(0.13, 36, -80);
  const whyFade = useScrollFadeIn(0.13, 36);
  const testiFade = useScrollFadeIn(0.13, 36);
  const faqFade = useScrollFadeIn(0.13, 36);
  const partnersFade = useScrollFadeIn(0.13, 36);

  // Gold plant image comes from right
  const goldPlantFade = useScrollFadeIn(0.13, 0, 80);

  return (
    <div className="bg-[#faf6f3]">
      {/* Banner */}
      <div
        className="min-h-[420px] flex items-center justify-center relative rounded-b-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] -mt-8"
        style={{
          background:
            "url('/home/banner 2.png') center center/cover no-repeat",
          ...bannerFade.style,
        }}
        ref={bannerFade.ref}
      >
        <h1 className="text-white font-black text-[3.5rem] z-20 tracking-wider drop-shadow-[0_4px_24px_#7a1335cc]">
          About Us
        </h1>
      </div>

      {/* Intro Section */}
      <div
        className="container py-5 flex justify-center items-center min-h-[500px]"
      >
        <div className="row w-full justify-center items-center">
          <div
            className="col-md-6 flex flex-col justify-center items-center"
            ref={introFade.ref}
            style={introFade.style}
          >
            <div
              className="bg-gradient-to-br from-[#fff8e7] to-[#f7eded] rounded-3xl shadow-[0_4px_24px_#f0e3d1] px-8 pt-9 pb-8 mb-0 border-[1.5px] border-[#f9e9c7] relative overflow-hidden min-h-[420px] flex flex-col justify-center items-center text-center w-full h-full"
            >
              <h2 className="fw-bold mb-3 text-[2.6rem] leading-[1.18] text-[#7a1335] drop-shadow-[0_2px_8px_#f9e9c7] z-10 relative tracking-wide">
                Get access to the <span className="text-[#991616] font-black">safest</span> way of procuring... <br />
                <span className="text-[#991616] font-black text-[2.1rem] tracking-wide bg-gradient-to-r from-[#f9e9c7] to-[#fff8e7] rounded px-3 py-0.5 shadow-[0_2px_8px_#f0e3d1] inline-block">
                  24K Gold / Silver
                </span>
              </h2>
              <div className="text-[1.18rem] text-[#4a2e1e] bg-white rounded-lg px-5 py-4 shadow-[0_2px_12px_#f0e3d1] mb-4 z-10 relative">
                We at <span className="text-[#991616] font-semibold">Digital Gold</span> want to make your gold journey <b>simple</b>, <b>transparent</b> and <b>trustworthy</b> so that you can get the optimum output of your savings.
              </div>
              <div className="flex justify-center gap-4 flex-wrap z-10 relative">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="text-center border rounded py-4 px-4 feature-card min-w-[120px] bg-white shadow-[0_4px_16px_#f0e3d1] border-[1.5px] border-[#f9e9c7] transition-transform transition-shadow duration-200 cursor-pointer"
                    tabIndex={0}
                    onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px) scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                    onFocus={e => (e.currentTarget.style.transform = "translateY(-8px) scale(1.06)")}
                    onBlur={e => (e.currentTarget.style.transform = "none")}
                  >
                    <div
                      className="flex items-center justify-center mb-2 w-[54px] h-[54px] rounded-xl bg-[#f9e9c7] mx-auto shadow-[0_2px_8px_#f0e3d1]"
                    >
                      <CustomImage src={f.icon} width={32} height={32} alt={f.title} />
                    </div>
                    <div className="font-semibold mt-2 text-[#991616] text-lg">{f.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0 flex justify-center items-center">
            <div
              className="rounded-[32px] overflow-hidden shadow-[0_12px_40px_#f0e3d1] bg-white w-full max-w-[520px] min-h-[420px] border-[2.5px] border-[#f9e9c7] flex items-center justify-center mx-auto"
              ref={goldPlantFade.ref}
              style={goldPlantFade.style}
            >
              <CustomImage
                src="/assets/gold-plant.png"
                alt="Gold Plant"
                width={520}
                height={420}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  borderRadius: 32,
                  boxShadow: "0 4px 24px #f0e3d1",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div
        className="bg-gradient-to-br from-[#fff8e7] to-[#f7eded] rounded-2xl mb-8 pb-4 shadow-[0_2px_16px_#f0e3d1]"
        ref={whyFade.ref}
        style={whyFade.style}
      >
        <div className="container py-5">
          <div className="text-center mb-4">
            <div className="text-[#991616] font-bold text-lg">
              <span className="text-2xl align-middle">{"\u2728"}</span>
            </div>
            <h3 className="fw-bold text-[2.2rem] tracking-wide text-[#7a1335] drop-shadow-[0_2px_8px_#f9e9c7]">Why Choose Us?</h3>
          </div>
          <div className="row g-4 justify-content-center">
            {whyChoose.map((item, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div
                  className="bg-white rounded shadow-sm p-4 h-full border-[1.5px] border-[#f0e3d1] transition-shadow duration-200 cursor-pointer flex flex-col items-center min-h-[220px] shadow-[0_2px_8px_#f0e3d1]"
                  tabIndex={0}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
                  onFocus={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                  onBlur={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
                >
                  <div className="flex items-center justify-center mb-3 w-[68px] h-[68px] rounded-[22px] bg-[#f9e9c7] mx-auto shadow-[0_2px_8px_#f0e3d1]">
                    <CustomImage src={item.icon} width={38} height={38} alt={item.title} />
                  </div>
                  <div className="font-semibold text-center text-[#991616] text-xl">{item.title}</div>
                  <div className="mt-2 text-center text-base text-[#4a2e1e] leading-6">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        className="container py-5"
        ref={testiFade.ref}
        style={testiFade.style}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-[2.2rem] tracking-wide text-[#7a1335] drop-shadow-[0_2px_8px_#f9e9c7]">What Our Customers Say</h3>
        </div>
        <div className="row g-4">
          {testimonials.map((testimonial, idx) => (
            <div className="col-md-4" key={idx}>
              <div
                className="bg-white rounded shadow-sm p-4 h-full border-[1.5px] border-[#f0e3d1] transition-shadow duration-200 cursor-pointer shadow-[0_2px_8px_#f0e3d1]"
                tabIndex={0}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
                onFocus={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                onBlur={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
              >
                <div className="flex items-center mb-3">
                  <div className="w-[54px] h-[54px] rounded-full overflow-hidden mr-3.5 shadow-[0_2px_8px_#f0e3d1]">
                    <CustomImage src={testimonial.img} width={54} height={54} alt={testimonial.name} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#991616] text-lg">{testimonial.name}</div>
                    <div className="text-muted text-base">{testimonial.location}</div>
                  </div>
                </div>
                <div className="mt-2 text-base text-[#4a2e1e] leading-6">
                  "{testimonial.text}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="bg-[#f7f9fc] rounded-2xl mb-8 shadow-[0_2px_16px_#f0e3d1]"
        ref={faqFade.ref}
        style={faqFade.style}
      >
        <div className="container py-10">
          <div className="text-center mb-8">
            <h3 className="fw-bold text-[2.4rem] tracking-wide text-[#7a1335] drop-shadow-[0_2px_8px_#f9e9c7] font-extrabold">
              Frequently Asked Questions
            </h3>
            <div className="mx-auto mt-2 mb-6 w-24 h-1 rounded-full bg-gradient-to-r from-[#f9e9c7] via-[#991616] to-[#f7eded] opacity-70"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="w-full max-w-xl transition-transform duration-200 hover:-translate-y-1"
              >
                <div
                  className={`rounded-2xl shadow-[0_2px_12px_#f0e3d1] border-[2px] border-[#f0e3d1] bg-white transition-shadow duration-200 cursor-pointer overflow-hidden group`}
                  tabIndex={0}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setOpenFaq(openFaq === idx ? null : idx);
                  }}
                  aria-expanded={openFaq === idx}
                >
                  <div
                    className={`flex items-center justify-between px-8 py-6 font-semibold text-lg text-[#991616] transition-colors duration-200 cursor-pointer select-none
                      ${openFaq === idx ? "bg-[#f9e9c7] border-b-[2px] border-[#f0e3d1]" : "bg-white"}
                    `}
                  >
                    <span className="transition-colors duration-200">{faq.q}</span>
                    <span
                      className={`text-2xl ml-3 inline-block transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#7a1335]" : "rotate-0 text-[#991616]"}`}
                    >▼</span>
                  </div>
                  <div
                    className="transition-all duration-400 ease-in-out bg-[#fff8e7]"
                    style={{
                      maxHeight: openFaq === idx ? 220 : 0,
                      opacity: openFaq === idx ? 1 : 0,
                      overflow: "hidden",
                      color: "#4a2e1e",
                      fontSize: "1.08rem",
                      padding: openFaq === idx ? "22px 32px" : "0 32px",
                      borderTop: openFaq === idx ? "2px solid #f0e3d1" : "none",
                    }}
                  >
                    <div className="animate-fade-in">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div
        className="container py-5"
        ref={partnersFade.ref}
        style={partnersFade.style}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-[2.2rem] tracking-wide text-[#7a1335] drop-shadow-[0_2px_8px_#f9e9c7]">Our Trusted Partners</h3>
        </div>
        <div className="row g-4 justify-content-center">
          {partners.map((partner, idx) => (
            <div className="col-md-2 col-4" key={idx}>
              <div
                className="bg-white rounded shadow-sm p-4 flex items-center justify-center border-2 border-[#f0e3d1] transition-shadow duration-200 cursor-pointer min-h-[100px] min-w-[160px] shadow-[0_2px_8px_#f0e3d1]"
                tabIndex={0}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
                onFocus={e => (e.currentTarget.style.boxShadow = "0 8px 32px #f9e9c7")}
                onBlur={e => (e.currentTarget.style.boxShadow = "0 2px 8px #f0e3d1")}
              >
                <CustomImage src={partner.src} alt={partner.alt} width={140} height={60} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;