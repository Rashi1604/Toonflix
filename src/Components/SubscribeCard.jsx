import React, { useEffect, useState } from "react";
import { getAmount } from "../Pages/API";
import { useNavigate } from "react-router-dom";
import { subscribeUser } from "../Pages/API";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SubscribeCard.css'
import { v4 as uuidv4 } from 'uuid';

const SubscribeCard = () => {
  const navigate = useNavigate();
  const uniqueId = uuidv4(); 

  const handlePackChange = (event) => {
    const newPack = event.target.value;
    setSelectedPack(newPack);
    console.log("Pack changed to:", newPack);
  };

  const packs = ["Daily", "Weekly", "Monthly"];
  const [selectedPack, setSelectedPack] = useState("Daily");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false); // <-- added loading state

  const fetchAmountIfNotCached = async (pack) => {
    const key = `amount_${pack}`;
    const cached = localStorage.getItem(key);

    if (cached) {
      console.log(`Using cached amount for ${pack}:`, cached);
      return;
    }

    try {
      const res = await axios.post(getAmount, { pack });
      const amount = res.data[0]?.amount;

      if (amount !== undefined) {
        localStorage.setItem(key, amount);
        console.log(`Fetched amount for ${pack}:`, amount);
      }
    } catch (err) {
      console.error(`Error fetching amount for ${pack}:`, err);
    }
  };

  useEffect(() => {
    packs.forEach((pack) => {
      fetchAmountIfNotCached(pack);
    });
  }, []);

  useEffect(() => {
    const key = `amount_${selectedPack}`;
    const cachedAmount = localStorage.getItem(key);
    setAmount(cachedAmount);
  }, [selectedPack]);

  const [msisdn, setMsisdn] = useState("");

  const handleSubscribe = async () => {
  setLoading(true);

  const payload = {
      pack: selectedPack,
      msisdn: msisdn,
      service: "Toonflix",
      amount: amount,
      trx_id:uniqueId
    };

    console.log(payload,'data--for subscribe--------')


  if( !selectedPack || !msisdn || !amount || !uniqueId){
    toast.warning('Something Went Wrong!!')
    return;
  }
  try {
    const response = await axios.post(subscribeUser, payload);
    console.log("Subscribe success:", response.data);
    toast.success(response?.data?.msg)
    // navigate("/"); // Navigate after successful subscription
    
if (response.data.result === 1) {
  navigate("/"); // Navigate only if result === 1
} else {
  toast.error("Abonnement échoué. Veuillez réessayer.");
}

  } catch (error) {
    console.error("Subscribe failed:", error);
    const errorMsg = error?.response?.data?.msg;

    // Check if user already subscribed
    if (errorMsg && errorMsg.toLowerCase().includes("already")) {
      toast.info("Déjà abonné. Redirection vers l'accueil...");
      navigate("/"); // Navigate to homepage if already subscribed
    } else {
      toast.error(errorMsg || "Erreur d'abonnement");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="subscribe-container">
      <div className="subscribe-card">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="Kiddy Logo" className="h-10 sm:h-18 md:h-20" />
        </div>
        <p className="subscribe-text">
          Abonnez-vous pour des sourires, des rires et des dessins animés
        </p>
        <input
          value={msisdn}
          onChange={(e) => {
            setMsisdn(e.target.value);
            localStorage.setItem("msisdn", e.target.value);
          }}
          placeholder="Entrez votre numéro"
          className="subscribe-input"
        />
        <select
          value={selectedPack}
          onChange={handlePackChange}
          className="subscribe-dropdown"
        >
          <option value="Daily">Tous les jours</option>
          <option value="Weekly">hebdomadaire</option>
          <option value="Monthly">Mensuel</option>
        </select>
        <button
          onClick={handleSubscribe}
          className="subscribe-button"
          disabled={loading} // <-- disable while loading
        >
          {loading ? "Abonnement en cours..." : "S'abonner"} {/* <-- dynamic text */}
        </button>
      </div>
    </div>
  );
};

export default SubscribeCard;
