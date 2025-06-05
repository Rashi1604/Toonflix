
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      axios
        .get(`https://kids.toon-flix.com/search?keyword=${encodeURIComponent(query)}`)
        .then((res) => {
          // console.log("API response:", res.data);
          if (Array.isArray(res.data.videos) && res.data.videos.length > 0) {
            setResults(res.data.videos);
            setShowDropdown(true);
          } else {
            setResults([]);
            setShowDropdown(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setResults([]);
          setShowDropdown(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (video) => {
    setShowDropdown(false);
    setQuery(video.title || video.name || "");
    // Navigate to video detail page by id (change route if needed)
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="relative w-full max-w-2xl ">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 pl-4 pr-12 rounded-lg text-gray-700 border border-gray-300 hover:border-yellow-400 focus:border-yellow-500 outline-none transition duration-200"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500"
        aria-label="Search"
        onClick={() => {
          // Optional: maybe trigger search on button click too
          if (results.length > 0) setShowDropdown(true);
        }}
      >
        <Search />
      </button>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white text-black mt-1 max-h-60 overflow-y-auto rounded shadow-lg border border-gray-300 z-50">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-2 border-b hover:bg-gray-100 text-sm cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.title || item.name || "Untitled"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

