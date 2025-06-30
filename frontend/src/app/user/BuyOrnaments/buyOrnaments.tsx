import CustomImage from "../../components/custom/Image";
import {products} from "../../../../constants";


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
                <CustomImage
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
                <a
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
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyOrnamentsPage;
