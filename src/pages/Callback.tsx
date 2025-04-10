import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleCallback } from "../auth/auth";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleCallback()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default Callback;
