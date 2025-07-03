import React, { useEffect, useState } from "react";
import { products } from "../../../../constants"; // adjust path if needed
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const ids = stored ? JSON.parse(stored) : [];
    setCart(ids);
    setCartProducts(products.filter((p) => ids.includes(p.id)));
  }, []);

  const removeFromCart = (id: number) => {
    const updated = cart.filter((pid) => pid !== id);
    setCart(updated);
    setCartProducts(products.filter((p) => updated.includes(p.id)));
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartProducts.reduce((sum, p) => {
    // Remove non-numeric chars from price and parse as number
    const price = Number(String(p.price).replace(/[^\d]/g, ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <div
      style={{
        padding: "40px 0",
        minHeight: "80vh",
        background: "#fafbfc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#7a1335",
            marginBottom: 32,
            textAlign: "center",
            letterSpacing: 0.1,
          }}
        >
          Your Cart
        </h1>
        {cartProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: 20,
              marginTop: 60,
            }}
          >
            <span
              style={{
                fontSize: 48,
                display: "block",
                marginBottom: 16,
              }}
            >
              🛒
            </span>
            Your cart is empty.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
            }}
          >
            {cartProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  boxShadow: "0 4px 24px #e6e6e6",
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1.5px solid #f9e9c7",
                  minHeight: 120,
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      borderRadius: 10,
                      background: "#fafbfc",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#7a1335",
                        marginBottom: 2,
                      }}
                    >
                      {product.title}
                    </div>
                    <div
                      style={{
                        color: "#888",
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      {product.category}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#bf7e1a",
                        fontSize: 18,
                      }}
                    >
                      {product.price}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                  }}
                >
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
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 size={18} style={{ marginRight: 4 }} />
                    Remove
                  </button>
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
                    // onClick={() => { /* Buy now logic here */ }}
                  >
                    <ShoppingBag size={18} style={{ marginRight: 4 }} />
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fffbe8",
            borderRadius: 14,
            padding: "24px 32px",
            boxShadow: "0 2px 8px #f9e9c7",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#7a1335",
            }}
          >
            Total: ₹{total}
          </span>
          <button
            style={{
              background: "#bf7e1a",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "14px 38px",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 0.2,
              boxShadow: "0 2px 8px #f9e9c7",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
            // onClick={() => { /* Checkout logic here */ }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
