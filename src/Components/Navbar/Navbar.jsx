import { Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import Searchbar from "../Searchbar";
import { toast } from 'react-toastify';
import { deactivateUser } from "../../Pages/API";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [unsubscribing, setUnsubscribing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://kids.toon-flix.com/videoFrench")
      .then((res) => {
        if (Array.isArray(res.data.categories)) {
          const filtered = res.data.categories.filter((item) => item.id != 74);
          setCategories(filtered);
        }
      })
      .catch((err) => console.error("Error loading categories:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      axios
        // .get(`https://www.demo-new.toon-flix.com/api/little?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setSearchResults(res.data);
          } else {
            setSearchResults([]);
          }
        })
        .catch((err) => {
          console.error("Error searching:", err);
          setSearchResults([]);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleUnSubscribe = async () => {
    const msisdn = localStorage.getItem("msisdn");
    setUnsubscribing(true);
    try {
      const payload = {
        msisdn,
        service: "Toonflix",
      };
      const response = await axios.post(deactivateUser, payload);
      console.log("Unsubscribe response:", response);
      toast.success(response?.data.msg);
      localStorage.removeItem("msisdn");
      navigate("/subscribe");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setUnsubscribing(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#005DAA] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap px-4 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/Toonflix.png" alt="Kiddy Logo" className="h-20 sm:h-28 md:h-40" />
          </div>

          {/* Toggle for Mobile */}
          <div className="md:hidden">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </button>
          </div>

          {/* Desktop Searchbar + Unsubscribe */}
          <div className="hidden md:flex ml-auto items-center space-x-4">
            <Searchbar />
            <button
              className={`${
                unsubscribing ? "bg-[#ffc285] cursor-not-allowed" : "bg-[#EF7D00] hover:bg-[#efa657] cursor-pointer"
              } text-white font-bold w-48 h-23 p-3 rounded-xl`}
              onClick={handleUnSubscribe}
              disabled={unsubscribing}
            >
              {unsubscribing ? "Désabonnement en cours..." : "Se désabonner"}
            </button>
          </div>
        </div>

        {/* Mobile Searchbar */}
        <div className="block md:hidden px-4 mb-2">
          <Searchbar />
        </div>

        {/* Navigation Links */}
        {!loading && (
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex bg-[#005DAA] text-white px-4 pb-6 md:pb-2 justify-center flex-wrap md:space-x-4 font-medium text-lg transition-all duration-300`}
          >
            <Link
              to="/"
              className="block md:inline hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
            >
              Domicile
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="block md:inline hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
              >
                {cat.name}
              </Link>
            ))}

            {/* Mobile Unsubscribe Button */}
            <button
              onClick={handleUnSubscribe}
              className={`block md:hidden mt-4 w-full ${
                unsubscribing ? "bg-[#ffc285] cursor-not-allowed" : "bg-[#EF7D00] hover:bg-[#efa657] cursor-pointer"
              } text-white text-sm font-bold py-2 rounded-lg text-center`}
              disabled={unsubscribing}
            >
              {unsubscribing ? "Désabonnement en cours..." : "Se désabonner"}
            </button>
          </div>
        )}

        {/* Decorative border */}
        <div className="bg-white h-8 w-full -mt-1 rounded-t-[50%]"></div>
      </nav>

      {/* Offset for fixed navbar */}
      <div className="lg:pt-22 pt-28 sm:pt-32 md:pt-40"></div>
    </>
  );
}
