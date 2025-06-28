import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    img: "/assets/gold-coin-1g.png",
    title: "Gh 1 Gram Gold Coin 24k (99.9%)",
    price: "₹ 50000.32",
    details: "#",
  },
  {
    img: "/assets/silver-necklace-22g.png",
    title: "22 gram girls silver necklace (99.99%)",
    price: "₹ 500.36",
    details: "#",
  },
  {
    img: "/assets/gold-necklace-22g.png",
    title: "22 gram girls necklace (99.99%)",
    price: "₹ 45161.58",
    details: "#",
  },
  {
    img: "/assets/silver-coin-2g.png",
    title: "Gh 1 Gram Silver Coin 24k (99.9%)",
    price: "₹ 6081.36",
    details: "#",
  },
  {
    img: "/assets/silver-necklace-38g.png",
    title: "38 Gram Girls Necklace (99.99%)",
    price: "₹ 45002.00",
    details: "#",
  },
  {
    img: "/assets/gold-coin-1g.png",
    title: "Gh 1 Gram Coin 24k (99.9%)",
    price: "₹ 654321.00",
    details: "#",
  },
];

const BuyOrnamentsPage = () => {
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
        <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "2.8rem", zIndex: 2 }}>
          Buy Gold & Silver
        </h1>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
            
          }}
        />
      </div>

      {/* Product Grid */}
      <div className="container py-5">
        <div className="row g-4">
          {products.map((product, idx) => (
            <div className="col-md-4" key={idx}>
              <div
                className="bg-white rounded shadow-sm p-4 h-100 d-flex flex-column align-items-center"
                style={{
                  border: "1px solid #eee",
                  minHeight: 340,
                  justifyContent: "center",
                }}
              >
                <Image
                  src={product.img}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{ objectFit: "contain", marginBottom: 16 }}
                />
                <div className="fw-bold text-center" style={{ fontSize: "1.08rem", minHeight: 48 }}>
                  {product.title}
                </div>
                <div
                  className="fw-bold my-2"
                  style={{ color: "#7a1335", fontSize: "1.1rem" }}
                >
                  {product.price}
                </div>
                <Link
                  href={product.details}
                  className="btn mt-auto"
                  style={{
                    background: "#b76e79",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 8,
                    minWidth: 120,
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyOrnamentsPage;
