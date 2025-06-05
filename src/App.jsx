import { Routes, Route } from "react-router-dom";
import './App.css';
import CategoryVideos from "./Pages/Categorypage";
import Homepage from "./Pages/Homepage";
import CardVideos from "./Components/Cards/CardVideos";
import SubscribeCard from "./Components/SubscribeCard";
import Auth from "./Pages/Auth";
import SubscribeAuth from "./Pages/SubscribeAuth";
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth><Homepage/></Auth>} />
        <Route path="/video/:id" element={<CardVideos />} />
        <Route path="/category/:id" element={<CategoryVideos key={window.location.pathname} />} />
        <Route path="/subscribe" element={<SubscribeCard />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
