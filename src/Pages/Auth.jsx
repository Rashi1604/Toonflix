import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkUser } from "./API";


const Auth = ({children}) => {
  const navigate = useNavigate();
  const msisdn = localStorage.getItem("msisdn"); 

  const checkMsisdn = async () => {
    console.log(msisdn,"---m---")
    if (!msisdn) {
    navigate("/subscribe"); 
    return;

    } 
    try {
      const response = await axios.post(checkUser, { msisdn,service:'Toonflix' });
      console.log("User check response:", response);
      if(response.data.result==0){
          navigate("/subscribe");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
};
  useEffect(() => {
    checkMsisdn();
  }, []);

  return(
    <>
    {children}
    </>
  ); 
};

export default Auth;
