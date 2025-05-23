import { Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import Searchbar from "../Searchbar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      .finally(() => setLoading(false)); // 
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

  return (
    <>
      <Searchbar />
      <nav className="fixed top-0 w-full z-50 bg-[#005DAA] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap">
          {/* Logo */}
          <div className="flex items-center mr-12">
            <img src="/Toonflix.png" alt="Kiddy Logo" className=" sm:h-28 md:h-40" />
          </div>

          {/* Toggle for Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>

          {/* Search Bar */}
          {/* <div className="hidden sm:flex flex-grow justify-center relative max-w-2xl w-full">
            <input
              type="text"
              placeholder=" Rechercher ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4  rounded-lg text-gray-700 border border-transparent hover:border-white focus:border-[#EF7D00] outline-none transition duration-200"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#EF7D00]">
              <Search />
            </button>

            {/* Search Results Dropdown */}
            {/* {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white text-black mt-2 max-h-60 overflow-y-auto rounded shadow-lg z-50">
                {searchResults.map((item, index) => (
                  <div key={index} className="p-2 border-b hover:bg-gray-100 text-sm">
                    {item.title || "Untitled"}
                  </div>
                ))}
              </div>
            )}
          </div> */} 
               {/* Searchbar component */}
      <div >
        <Searchbar />
      </div>

          {/* Login Button */}
          {/* <div className="hidden lg:flex items-center">
            <button className="btn">Login</button>
          </div> */}
        </div>

        {/* Navigation Links */}
        {!loading && ( // ✅ Hide entire nav links while loading
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex bg-[#005DAA] text-white px-4 pb-4 -mt-8 mb-8 md:pb-0 justify-center flex-wrap space-x-0 md:space-x-4 font-medium text-lg transition-all duration-300`}
          >
            <>
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
            </>

            {/* Login for Mobile */}
            {/* <div className="sm:hidden mt-3 text-center">
              <button className="btn">Login</button>
            </div> */}
          </div>
        )}

        {/* Decorative border */}
        <div className="bg-white h-8 w-full -mt-1 rounded-t-[50%]"></div>
      </nav>

      {/* Offset for fixed navbar */}
      <div className="lg:pt-22 pt-20"></div>
    </>
  );
}







// import { Search, Menu } from "lucide-react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Searchbar from "../Searchbar";
// import "./Navbar.css";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://kids.toon-flix.com/videoFrench")
//       .then((res) => {
//         // Check if categories array exists in response
//         if (res.data?.categories && Array.isArray(res.data.categories)) {
//           const filtered = res.data.categories.filter((item) => item.id !== 74);
//           setCategories(filtered);
//         }
//       })
//       .catch((err) => console.error("Error loading categories:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <>
// {/*       

//       {/* Navbar */}
//       <nav className="fixed top-0 w-full z-50 bg-[#005DAA] text-white overflow-hidden">
//         <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap px-4 py-2">
//           {/* Logo */}
//           <div className="flex items-center mr-12">
//             <img src="/Toonflix.png" alt="Kiddy Logo" className="sm:h-28 md:h-40" />
//           </div>
//           {/* Searchbar component */}
//       <div >
//         <Searchbar />
//       </div>
//           {/* Mobile menu toggle */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <Menu />
//           </button>

//           {/* Desktop Navigation Links */}
//           {!loading && (
//             <div className="hidden md:flex space-x-6 font-medium text-lg">
//               <Link
//                 to="/"
//                 className="hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
//               >
//                 Domicile
//               </Link>

//               {categories.map((cat) => (
//                 <Link
//                   key={cat.id}
//                   to={`/category/${cat.id}`}
//                   className="hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Mobile Navigation Menu */}
//         {!loading && (
//           <div
//             className={`md:hidden px-4 pb-4 ${
//               isMenuOpen ? "block" : "hidden"
//             } bg-[#005DAA] text-white font-medium text-lg space-y-2`}
//           >
//             <Link
//               to="/"
//               className="block hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Domicile
//             </Link>

//             {categories.map((cat) => (
//               <Link
//                 key={cat.id}
//                 to={`/category/${cat.id}`}
//                 className="block hover:p-2 hover:bg-[#EF7D00] hover:text-white hover:rounded-lg transition-all duration-300 px-2 py-1"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {cat.name}
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Decorative border */}
//         <div className="bg-white h-8 w-full -mt-1 rounded-t-[50%]"></div>
//       </nav>

//       {/* Spacer for fixed navbar */}
//       <div className="lg:pt-22 pt-20"></div>
//     </>
//   );
// } */}
