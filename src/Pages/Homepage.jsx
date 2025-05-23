import React,{useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HeroSection from '../Components/Hero/Hero'
import Cards from '../Components/Cards/Cards'
import CardVideos from '../Components/Cards/CardVideos'
import Footer from '../Components/Footer/Footer'
import { Search } from 'lucide-react'
import Cookies from 'js-cookie'
function generateUniqueUserId() {
  let str = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let uuid = "OM_";
  for (let i = 0; i < 16; i++) {
    uuid += str.charAt(Math.floor(Math.random() * str.length));
  }
  return uuid;
}
// import ContinueVideos from '../Components/Hero/ContinueVideos'
const Homepage = () => {

  useEffect(() => {
    const exist = Cookies.get("number");
    if (exist === undefined || exist === null || exist === "null") {
      const uniqueid = generateUniqueUserId();
      return Cookies.set("number", uniqueid, { expires: 2 });
    }
    console.log("cookie<><><><>");
  }, []);

  return (
    <div>
      <Navbar/>
     <HeroSection/>
    {/* <Cards/> */}
      <div id="cards-section">
        <Cards />
      </div>
    <CardVideos/>
    <Footer/>
    </div>
  )
}

export default Homepage
