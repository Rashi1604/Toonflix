import { Routes, Route } from "react-router-dom";
import './App.css';
import CategoryVideos from "./Pages/Categorypage";
import Homepage from "./Pages/Homepage";
import CardVideos from "./Components/Cards/CardVideos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video/:id" element={<CardVideos />} />
        <Route path="/category/:id" element={<CategoryVideos key={window.location.pathname} />} />
      </Routes>
    </>
  );
}

export default App;
