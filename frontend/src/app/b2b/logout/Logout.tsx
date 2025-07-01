import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear session, tokens, etc.
    navigate("/b2b/login");
  }, [navigate]);
  return (
    <div className="flex items-center justify-center h-40 text-lg text-gray-500">
      Logging out...
    </div>
  );
}
