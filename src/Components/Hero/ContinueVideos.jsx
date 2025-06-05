

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const ContinueVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncate = (text, maxLength = 25) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength - 2) + '...' : text;
  };

  const ani = Cookies.get("number");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://kids.toon-flix.com/api/watching/?ani=${ani}`)
      .then((res) => {
        console.log("API response:", res.data);
        setVideos(res.data.videos || []);
      })
      .catch((err) => console.error("Error loading continue videos:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-12 px-4">
      {loading ? (
          <div className="flex justify-center gap-x-2 mb-10">
          <div className="w-5 h-5 bg-[#ffd1a0] rounded-full animate-bounce animate-pulse" />
          <div className="w-5 h-5 bg-[#e59845] rounded-full animate-bounce animate-pulse delay-100" />
          <div className="w-5 h-5 bg-[#e27500] rounded-full animate-bounce animate-pulse delay-200" />
        </div>
      ) : videos.length > 0 ? (
        <>
          <h1 className="font-bold flex justify-start w-full text-4xl text-[#EF7D00] mb-8 drop-shadow-md">
          continuer à regarder
          </h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link to={`/video/${video.videoid}`} key={video.id}>
                <motion.div
                  className="flex flex-col rounded-xl bg-white text-gray-700 shadow-md cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div className="h-40 overflow-hidden rounded-t-xl">
                    <img
                      src={video.imageurl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-blue-gray-900">
                      {truncate(video.title)}
                    </h5>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ContinueVideos;
