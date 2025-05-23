import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'


const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const ani = Cookies.get('number')

  const handleclickvideo=(video)=>{
    console.log(video,'clicked video')
    const data = {
        ani: ani,
        videoid: video.id,
        imageurl: video.imgurl,
        title: video.name,
        vurl: video.vurl,
      };

    try{
      const res = axios.post('https://kids.toon-flix.com/api/continue-watching',data)
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }



  const truncate = (text, maxLength = 25) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength - 2) + '...' : text;
};
  useEffect(() => {
    axios.get('https://kids.toon-flix.com/videoFrench')
      .then((response) => {
        const result = response.data;

        if (Array.isArray(result.videos)) {
          setCards(result.videos);
        } else {
          console.error('Unexpected API structure:', result);
        }
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-center font-bold text-5xl  text-[#EF7D00] leading-tight drop-shadow-md">
        Dessins animés populaires 
      </h1>

      <div className="w-full my-32 px-6">
        {loading ? (
         <div className="flex justify-center gap-x-2 mb-10">
          <div className="w-5 h-5 bg-[#ffd1a0] rounded-full animate-bounce animate-pulse" />
          <div className="w-5 h-5 bg-[#e59845] rounded-full animate-bounce animate-pulse delay-100" />
          <div className="w-5 h-5 bg-[#e27500] rounded-full animate-bounce animate-pulse delay-200" />
        </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 -mt-20 gap-6">
            {cards.map((card, index) => (
                         <Link to={`/video/${card.id}`} key={index}>
                <motion.div
                  className="flex flex-col rounded-xl bg-white text-gray-700 shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div onClick={()=>handleclickvideo(card)}
                  className="h-40 overflow-hidden rounded-t-xl">
                    <img
                      src={card.imgurl}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-blue-gray-900">
                      {/* {card.name} */}
                       {truncate(card.name)}
                    </h5>
                   
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;

