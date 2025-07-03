import React, { useEffect, useState } from "react";
import { products } from "../../../../constants"; // adjust path if needed
import { ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const ids = stored ? JSON.parse(stored) : [];
    setWishlist(ids);
    setWishlistProducts(products.filter((p) => ids.includes(p.id)));
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((pid) => pid !== id);
    setWishlist(updated);
    setWishlistProducts(products.filter((p) => updated.includes(p.id)));
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{
      padding: "40px 0",
      minHeight: "80vh",
      background: "#fafbfc",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 16px"
      }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          color: "#7a1335",
          marginBottom: 32,
          textAlign: "center",
          letterSpacing: 0.1
        }}>
          Your Wishlist
        </h1>
        {wishlistProducts.length === 0 ? (
          <div style={{
            textAlign: "center",
            color: "#888",
            fontSize: 20,
            marginTop: 60
          }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>💔</span>
            Your wishlist is empty.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32
          }}>
            {wishlistProducts.map((product) => (
              <div key={product.id} style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 4px 24px #e6e6e6",
                padding: "28px 20px 20px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                border: "1.5px solid #f9e9c7",
                minHeight: 340,
                transition: "box-shadow 0.2s, transform 0.2s"
              }}>
                <img
                  src={product.img}
                  alt={product.title}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 12,
                    marginBottom: 18,
                    background: "#fafbfc"
                  }}
                />
                <div style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#7a1335",
                  marginBottom: 6,
                  textAlign: "center"
                }}>
                  {product.title}
                </div>
                <div style={{
                  color: "#888",
                  fontSize: 15,
                  marginBottom: 8,
                  textAlign: "center"
                }}>
                  {product.category}
                </div>
                <div style={{
                  fontWeight: 700,
                  color: "#bf7e1a",
                  fontSize: 22,
                  marginBottom: 12
                }}>
                  {product.price}
                </div>
                <div style={{
                  display: "flex",
                  gap: 12,
                  marginTop: "auto"
                }}>
                  <button
                    style={{
                      background: "#7a1335",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 18px",
                      fontWeight: 600,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      cursor: "pointer",
                      transition: "background 0.18s",
                    }}
                    // onClick={() => { /* Add to cart logic here */ }}
                  >
                    <ShoppingCart size={18} style={{ marginRight: 4 }} />
                    Add to Cart
                  </button>
                  <button
                    style={{
                      background: "#fff",
                      color: "#991313",
                      border: "1.5px solid #f0e3d1",
                      borderRadius: 10,
                      padding: "10px 18px",
                      fontWeight: 600,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      cursor: "pointer",
                      transition: "background 0.18s, color 0.18s",
                    }}
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 size={18} style={{ marginRight: 4 }} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
