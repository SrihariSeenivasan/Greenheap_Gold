import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface PartnerPopupProps {
  open: boolean;
  onClose: () => void;
}

const PartnerPopup: React.FC<PartnerPopupProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  if (!open) return null;

  // Prevent background scroll when popup is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle OTP input focus
  const handleOtpChange = (idx: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    if (value && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 32,
          maxWidth: 420,
          width: "95vw",
          padding: "38px 32px 32px 32px",
          boxShadow: "0 12px 40px #00000033",
          position: "relative",
          textAlign: "center",
          animation: "popup-fade-in 0.25s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 52,
              marginBottom: 12,
              background: "transparent",
              borderRadius: 0,
              boxShadow: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 30,
            marginBottom: 10,
            color: "#991313",
            letterSpacing: 0.2,
            fontFamily: "inherit",
            textShadow: "0 2px 8px #f9e9c7",
            textAlign: "center"
          }}
        >
          Welcome to Greenheap Gold
        </h2>
        <div
          style={{
            borderBottom: "3px solid #991313",
            width: 80,
            margin: "0 auto 26px auto",
            opacity: 0.7,
          }}
        />
        {step === "form" && (
          <form
            style={{ marginTop: 0 }}
            onSubmit={e => {
              e.preventDefault();
              setStep("otp");
            }}
            autoComplete="off"
          >
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <label
                style={{
                  fontWeight: 700,
                  color: "#222",
                  fontSize: 17,
                  marginBottom: 6,
                  display: "block",
                  letterSpacing: 0.1,
                }}
              >
                Phone Number <span style={{ color: "#991313" }}>*</span>
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #f0e3d1",
                  borderRadius: 14,
                  background: "#f9f7f6",
                  padding: "0 16px",
                  marginBottom: 4,
                  boxShadow: "0 1px 4px #f9e9c7",
                  transition: "border 0.2s",
                }}
              >
                <span style={{ color: "#888", fontWeight: 600, fontSize: 18, marginRight: 8 }}>+91</span>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 18,
                    flex: 1,
                    padding: "14px 0",
                    fontWeight: 500,
                    color: "#991313",
                  }}
                  maxLength={10}
                  required
                />
              </div>
              <div style={{ color: "#991313", fontSize: 14, marginTop: 2, fontWeight: 500 }}>
                Enter Your Phone Number
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", margin: "18px 0 18px 0" }}>
              <input type="checkbox" id="agree" style={{ marginRight: 8, width: 18, height: 18, accentColor: "#991313" }} required />
              <label htmlFor="agree" style={{ fontSize: 15, color: "#222", fontWeight: 500 }}>
                I agree to{" "}
                <span style={{ color: "#991313", textDecoration: "underline", cursor: "pointer" }}>
                  Terms and Condition
                </span>{" "}
                and{" "}
                <span style={{ color: "#991313", textDecoration: "underline", cursor: "pointer" }}>
                  Privacy Policy
                </span>
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #991313 70%, #bf7e1a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "16px 0",
                fontWeight: 700,
                fontSize: 20,
                marginTop: 8,
                cursor: "pointer",
                transition: "background 0.18s",
                marginBottom: 0,
                letterSpacing: 0.2,
                boxShadow: "0 2px 8px #f9e9c7",
              }}
            >
              Get OTP
            </button>
          </form>
        )}
        {step === "otp" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#991313", marginBottom: 10 }}>
              OTP sent to <span style={{ color: "#222" }}>+91 {phone}</span>
            </div>
            <div style={{ color: "#444", fontSize: 15, marginBottom: 18 }}>
              Please enter the <b>6-digit OTP</b> sent to your mobile number.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map(idx => (
                <input
                  key={idx}
                  // @ts-ignore
                  ref={el => { otpRefs.current[idx] = el as HTMLInputElement | null; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(idx, e)}
                  style={{
                    width: 44,
                    height: 54,
                    fontSize: 28,
                    textAlign: "center",
                    border: "2px solid #991313",
                    borderRadius: 10,
                    outline: "none",
                    background: "#f9f7f6",
                    fontWeight: 700,
                    color: "#991313",
                    boxShadow: "0 1px 4px #f9e9c7",
                    transition: "border 0.2s",
                  }}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            <button
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #991313 70%, #bf7e1a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "14px 0",
                fontWeight: 700,
                fontSize: 20,
                marginTop: 8,
                cursor: "pointer",
                transition: "background 0.18s",
                marginBottom: 0,
                letterSpacing: 0.2,
                boxShadow: "0 2px 8px #f9e9c7",
              }}
              // Add your OTP submit logic here
              onClick={() => {
                // handle login logic here
                navigate("/pdashboard");

                
              }}
            >
              Verify OTP
            </button>
            <div style={{ marginTop: 18 }}>
              <span style={{ color: "#991313", fontWeight: 500, cursor: "pointer", fontSize: 15, textDecoration: "underline" }}>
                Resend OTP
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            onClose();
            navigate("/");
          }}
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#991313",
            cursor: "pointer",
            fontWeight: 700,
            lineHeight: 1,
            transition: "color 0.18s",
          }}
          aria-label="Close"
        >
          ×
        </button>
        <style>
          {`
            @keyframes popup-fade-in {
              from { opacity: 0; transform: scale(0.96);}
              to { opacity: 1; transform: scale(1);}
            }
            input:focus {
              border-color: #bf7e1a !important;
              background: #fffbe8 !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PartnerPopup;
