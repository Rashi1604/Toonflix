import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkUser } from "./API";


const SubscribeAuth = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  const checkSubscriptionStatus = async () => {
    const msisdn = localStorage.getItem("msisdn");

    if (!msisdn) {
      setChecking(false); // Let them stay on subscribe page if no msisdn found
      return;
    }

    try {
      const response = await axios.post(checkUser, { msisdn, service: "Toonflix" });

      if (response?.data?.result == "1") {
        navigate("/"); // User is already subscribed
      } else {
        setChecking(false); // Allow them to proceed with subscription
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setChecking(false); // Fail gracefully and allow access
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);


  return <>{children}</>;
};

export default SubscribeAuth;
