import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../store";
import { 
  loginUser, 
  sendRegistrationOtp, 
  verifyOtpAndRegister, 
  resendOtp 
} from "../features/thunks/authThunks";
import { clearAuthError } from "../features/slices/authSlice";

interface SignupPopupProps {
  open: boolean;
  onClose: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { status, error: authError, currentUser } = useSelector((state: RootState) => state.auth);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  const [signupGender, setSignupGender] = useState("");
  const [signupDOB, setSignupDOB] = useState("");
  const [signupCity, setSignupCity] = useState("");
  const [signupTown, setSignupTown] = useState("");
  const [signupState, setSignupState] = useState("");
  const [signupCountry, setSignupCountry] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupCountryCode, setSignupCountryCode] = useState("+91");

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser && status === 'succeeded') {
      navigate("/user");
      onClose();
    }
  }, [currentUser, status, navigate, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      dispatch(clearAuthError());
    };
  }, [open, dispatch]);

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

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    setStep("form");
    setName("");
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setLoginUsername("");
    setLoginPassword("");
    setShowLoginPassword(false);
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    dispatch(clearAuthError());
    setValidationError(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginUsername, password: loginPassword }));
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signupGender || !signupDOB || !signupEmail.trim() || !phone.trim() || !signupCity.trim() || !signupTown.trim() || !signupState.trim() || !signupCountry.trim() || !signupPassword || !signupConfirmPassword) {
      setValidationError("Please fill all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(signupEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (signupPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (phone.length < 8 || phone.length > 15) {
      setValidationError("Please enter a valid phone number.");
      return;
    }
    setValidationError(null);
    dispatch(clearAuthError());

     dispatch(sendRegistrationOtp({
      fullName: name,
      gender: signupGender,
      dob: signupDOB,
      email: signupEmail,
      mobile: phone,
      countryCode: signupCountryCode,
      city: signupCity,
      town: signupTown,
      state: signupState,
      country: signupCountry,
      password: signupPassword,
    })).then(result => {
        if (sendRegistrationOtp.fulfilled.match(result)) {
          setStep("otp");
        }
      });
  };
  
   const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setValidationError("Please enter the complete 6-digit OTP.");
      return;
    }
    setValidationError(null);
    dispatch(clearAuthError());

    try {
       await dispatch(verifyOtpAndRegister({
        email: signupEmail,
        otp: fullOtp,
        fullName: name,
        gender: signupGender,
        dob: signupDOB,
        mobile: phone,
        countryCode: signupCountryCode,
        city: signupCity,
        town: signupTown,
        state: signupState,
        country: signupCountry,
        password: signupPassword,
      })).unwrap();
      onClose();
      switchMode("login");
    } catch (error) {
      setValidationError(error as string);
    }
  };
  
  const handleResendOtp = () => {
      dispatch(resendOtp({ email: signupEmail }));
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };
  
  if (!open) return null;

  const isLoading = status === 'loading';

  return (
    <div
      className=""
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
          maxWidth: 800,
          width: "98vw",
          padding: "32px 24px 24px 24px",
          boxShadow: "0 8px 32px #00000022",
          position: "relative",
          textAlign: "center",
          animation: "popup-fade-in 0.25s cubic-bezier(.4,0,.2,1)",
          minHeight: "unset",
          maxHeight: "90vh", 
          overflowY: "auto",  
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 44,
              marginBottom: 8,
              background: "transparent",
              borderRadius: 0,
              boxShadow: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, gap: 6 }}>
          <button
            style={{
              background: mode === "login" ? "#991313" : "#fff",
              color: mode === "login" ? "#fff" : "#991313",
              border: "1.5px solid #991313",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              padding: "7px 20px",
              cursor: "pointer",
              transition: "background 0.18s, color 0.18s",
              boxShadow: mode === "login" ? "0 1px 4px #f9e9c7" : "none",
            }}
            onClick={() => switchMode("login")}
            disabled={isLoading}
          >
            Login
          </button>
          <button
            style={{
              background: mode === "signup" ? "#991313" : "#fff",
              color: mode === "signup" ? "#fff" : "#991313",
              border: "1.5px solid #991313",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              padding: "7px 20px",
              cursor: "pointer",
              transition: "background 0.18s, color 0.18s",
              boxShadow: mode === "signup" ? "0 1px 4px #f9e9c7" : "none",
            }}
            onClick={() => switchMode("signup")}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 24,
            marginBottom: 8,
            color: "#991313",
            letterSpacing: 0.2,
            fontFamily: "inherit",
            textShadow: "0 2px 8px #f9e9c7",
            textAlign: "center"
          }}
        >
          {mode === "login" ? "Login to your account" : (step === "form" ? "Create your account" : "Verify your Email")}
        </h2>
        <div
          style={{
            borderBottom: "2px solid #991313",
            width: 60,
            margin: "0 auto 18px auto",
            opacity: 0.7,
          }}
        />

        {(authError || validationError) && (
            <div style={{ color: "#991313", fontWeight: 600, marginBottom: 10, padding: "8px", background: "#f9e9c7", borderRadius: "8px" }}>
              {authError || validationError}
            </div>
        )}

        {mode === "login" && step === "form" && (
          <form
            style={{ marginTop: 0 }}
            onSubmit={handleLoginSubmit}
            autoComplete="off"
          >
            <div style={{ textAlign: "left", marginBottom: 12 }}>
              <label
                style={{
                  fontWeight: 700,
                  color: "#222",
                  fontSize: 15,
                  marginBottom: 4,
                  display: "block",
                  letterSpacing: 0.1,
                }}
              >
                Email <span style={{ color: "#991313" }}>*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                style={{
                  border: "1.5px solid #f0e3d1",
                  borderRadius: 10,
                  background: "#f9f7f6",
                  padding: "10px 14px",
                  marginBottom: 6,
                  width: "100%",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#991313",
                  outline: "none",
                  boxShadow: "0 1px 4px #f9e9c7",
                  transition: "border 0.2s",
                }}
                required
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: 14, position: "relative", display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontWeight: 700,
                  color: "#222",
                  fontSize: 15,
                  marginBottom: 4,
                  display: "block",
                  letterSpacing: 0.1,
                }}
              >
                Password <span style={{ color: "#991313" }}>*</span>
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{
                    border: "1.5px solid #f0e3d1",
                    borderRadius: 10,
                    background: "#f9f7f6",
                    padding: "10px 38px 10px 14px",
                    marginBottom: 6,
                    width: "100%",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#991313",
                    outline: "none",
                    boxShadow: "0 1px 4px #f9e9c7",
                    transition: "border 0.2s",
                  }}
                  required
                />
                <span
                  onClick={() => setShowLoginPassword(v => !v)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#991313",
                    fontSize: 20,
                    userSelect: "none",
                    zIndex: 2,
                    background: "transparent",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    height: 28,
                    width: 28,
                    justifyContent: "center"
                  }}
                  tabIndex={0}
                  aria-label={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="#991313" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3.5" stroke="#991313" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.06-6.06" stroke="#991313" strokeWidth="2" />
                      <path d="M9.53 9.53A3.5 3.5 0 0 1 12 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .47-.09.92-.26 1.33" stroke="#991313" strokeWidth="2" />
                      <path d="M1 1l22 22" stroke="#991313" strokeWidth="2" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #991313 70%, #bf7e1a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 700,
                fontSize: 17,
                marginTop: 6,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.18s",
                marginBottom: 0,
                letterSpacing: 0.2,
                boxShadow: "0 2px 8px #f9e9c7",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div style={{ margin: "18px 0 0 0", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", margin: "12px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
                <span style={{ margin: "0 10px", color: "#888", fontWeight: 500, fontSize: 14 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
              </div>
              <button
                type="button"
                style={{
                  width: "100%",
                  background: "#fff",
                  color: "#222",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontWeight: 600,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: "0 2px 8px #f9e9c733",
                  cursor: "pointer",
                  transition: "background 0.18s, border 0.18s, box-shadow 0.18s",
                }}
              >
                <img
                  src="/home/go.png"
                  alt="Google"
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 8,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 1px 4px #eee"
                  }}
                />
                Continue with Google
              </button>
            </div>
          </form>
        )}
        {mode === "signup" && step === "form" && (
          <form
            style={{ marginTop: 0, width: "100%" }}
            onSubmit={handleSignupSubmit}
            autoComplete="off"
            noValidate
          >
            <div
              className="signup-fields-row "
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 0,
                width: "100%",
              }}
            >
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block", letterSpacing: 0.1 }}>
                  Name <span style={{ color: "#991313" }}>*</span>
                </label>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Gender <span style={{ color: "#991313" }}>*</span></label>
                <select value={signupGender} onChange={e => setSignupGender(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>D.O.B <span style={{ color: "#991313" }}>*</span></label>
                <input type="date" value={signupDOB} onChange={e => setSignupDOB(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Email ID <span style={{ color: "#991313" }}>*</span></label>
                <input type="email" placeholder="Enter your email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Phone Number <span style={{ color: "#991313" }}>*</span></label>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "0 12px", boxShadow: "0 1px 4px #f9e9c7" }} >
                  <select value={signupCountryCode} onChange={e => setSignupCountryCode(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", fontSize: 15, fontWeight: 600, color: "#991313", marginRight: 8 }} required >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                  </select>
                  <input type="tel" placeholder="Enter Phone Number" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} style={{ border: "none", outline: "none", background: "transparent", fontSize: 15, flex: 1, padding: "10px 0", fontWeight: 500, color: "#991313" }} maxLength={10} required />
                </div>
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>City <span style={{ color: "#991313" }}>*</span></label>
                <input type="text" placeholder="Enter your city" value={signupCity} onChange={e => setSignupCity(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Town <span style={{ color: "#991313" }}>*</span></label>
                <input type="text" placeholder="Enter your town" value={signupTown} onChange={e => setSignupTown(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>State <span style={{ color: "#991313" }}>*</span></label>
                <input type="text" placeholder="Enter your state" value={signupState} onChange={e => setSignupState(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Country <span style={{ color: "#991313" }}>*</span></label>
                <input type="text" placeholder="Enter your country" value={signupCountry} onChange={e => setSignupCountry(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Password <span style={{ color: "#991313" }}>*</span></label>
                <input type="password" placeholder="Enter password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
              <div style={{ flex: "1 1 45%", minWidth: 180, textAlign: "left" }}>
                <label style={{ fontWeight: 700, color: "#222", fontSize: 15, marginBottom: 4, display: "block" }}>Confirm Password <span style={{ color: "#991313" }}>*</span></label>
                <input type="password" placeholder="Confirm password" value={signupConfirmPassword} onChange={e => setSignupConfirmPassword(e.target.value)} style={{ border: "1.5px solid #f0e3d1", borderRadius: 10, background: "#f9f7f6", padding: "10px 14px", width: "100%", fontSize: 15, fontWeight: 500, color: "#991313", outline: "none", boxShadow: "0 1px 4px #f9e9c7" }} required />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", margin: "12px 0 12px 0" }}>
              <input type="checkbox" id="agree_signup" style={{ marginRight: 8, width: 16, height: 16, accentColor: "#991313" }} required />
              <label htmlFor="agree_signup" style={{ fontSize: 14, color: "#222", fontWeight: 500 }}>
                I agree to{" "}
                <span style={{ color: "#991313", textDecoration: "underline", cursor: "pointer" }}>Terms and Condition</span> and{" "}
                <span style={{ color: "#991313", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #991313 70%, #bf7e1a 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 700,
                fontSize: 17,
                marginTop: 6,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.18s",
                marginBottom: 0,
                letterSpacing: 0.2,
                boxShadow: "0 2px 8px #f9e9c7",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Sending OTP..." : "Get OTP"}
            </button>
            <div style={{ margin: "18px 0 0 0", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", margin: "12px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
                <span style={{ margin: "0 10px", color: "#888", fontWeight: 500, fontSize: 14 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "#eee" }} />
              </div>
              <button type="button" style={{ width: "100%", background: "#fff", color: "#222", border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "10px 0", fontWeight: 600, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 2px 8px #f9e9c733", cursor: "pointer" }} >
                <img src="/home/go.png" alt="Google" style={{ width: 22, height: 22, marginRight: 8, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px #eee" }} />
                Continue with Google
              </button>
            </div>
          </form>
        )}
        {step === "otp" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#991313", marginBottom: 10 }}>
              OTP sent to <span style={{ color: "#222" }}>{signupEmail}</span>
            </div>
            <div style={{ color: "#444", fontSize: 15, marginBottom: 18 }}>
              Please enter the <b>6-digit OTP</b> sent to your email address.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map(idx => (
                <input
                  key={idx}
                  ref={el => { otpRefs.current[idx] = el as HTMLInputElement | null; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(idx, e)}
                  style={{ width: 48, height: 48, fontSize: 28, textAlign: "center", border: "2px solid #991313", borderRadius: 10, outline: "none", background: "#f9f7f6", fontWeight: 700, color: "#991313", boxShadow: "0 1px 4px #f9e9c7" }}
                  autoFocus={idx === 0}
                  disabled={isLoading}
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
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
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.18s",
                marginBottom: 0,
                letterSpacing: 0.2,
                boxShadow: "0 2px 8px #f9e9c7",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            <div style={{ marginTop: 18 }}>
              <span onClick={handleResendOtp} style={{ color: "#991313", fontWeight: 500, cursor: isLoading ? "not-allowed" : "pointer", fontSize: 15, textDecoration: "underline", opacity: isLoading ? 0.7 : 1 }}>
                Resend OTP
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleClose}
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
          disabled={isLoading}
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
            @media (max-width: 1200px) {
              .signup-fields-row > div { min-width: 48% !important; }
              .signup-fields-row { gap: 12px !important; }
            }
            @media (max-width: 900px) {
              .signup-fields-row { flex-direction: column !important; }
            }
            @media (max-width: 600px) {
              .signup-fields-row > div { min-width: 100% !important; }
              .signup-fields-row { gap: 8px !important; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default SignupPopup;