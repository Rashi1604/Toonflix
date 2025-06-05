
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { color, motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Like from '../like&comment/Like';
import Footer from '../Footer/Footer';

const CardsVideos = () => {
  const { id } = useParams();
  console.log(id, "==id==");
  const [video, setVideo] = useState(null);
  console.log(video,"==video===")
  const [similarVideos, setSimilarVideos] = useState([]);
  const [loading, setLoading] = useState(true);
 const [num, setNum]=useState(null);
  useEffect(()=>{
    axios.get(`https://kids.toon-flix.com/like/likes-comments?videoid=${id}`).then((res)=>{
      // console.log(res.data.result,"----res---")
      const result = res.data.result
      setNum(result)
      console.log(num)
       fetchLikes();
    })
  },[id])
  const fetchLikes = () => {
  axios
    .get(`https://kids.toon-flix.com/like/likes-comments?videoid=${id}`)
    .then((res) => {
      setNum(res.data.result);
    });
};

  useEffect(() => {
  axios
    .get('https://kids.toon-flix.com/videoFrench')
    .then((res) => {
      const videos = res.data.videos;
      console.log("All video IDs:", videos.map(v => v.id));
      const found = videos.find((v) => v.id.toString() === id);
      setVideo(found);

      if (found) {
        const similar = videos.filter(
          (v) => v.id.toString() !== id && v.category_id === found.category_id
        );
        setSimilarVideos(similar);
      }
    })
    .catch((err) => console.error('Error loading video:', err))
    .finally(() => setLoading(false));
    
}, [id]);


  if (loading) {
    return (
      <div className="text-center">
        <div className="flex justify-center gap-x-2 mb-10">
          <div className="w-5 h-5 bg-[#ffd1a0] rounded-full animate-bounce animate-pulse" />
          <div className="w-5 h-5 bg-[#e59845] rounded-full animate-bounce animate-pulse delay-100" />
          <div className="w-5 h-5 bg-[#e27500] rounded-full animate-bounce animate-pulse delay-200" />
        </div>
      </div>
    );
  }

  if (!video) return <p className="text-center mt-10"></p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 w-full">
        <div className="bg-white rounded shadow p-6 max-w-8xl mx-auto mb-8">
          <h1 className="text-2xl text-center font-bold text-[#EF7D00] mb-4">
            {video.title || video.name || 'Untitled'}
          </h1>
          <div className="mb-6">
            <ReactPlayer url={video.vurl} controls playing={true} width="100%" height="400px" style={{
              background:"Black"
            }}/>
            {/* like comment */}
            <Like count={num[0]?.like_count} comment={num[0]?.comment_count}
             onRefresh={fetchLikes} 
            />
          </div>

          {similarVideos.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <h2 className="text-center font-bold text-4xl py-10 text-[#EF7D00] leading-tight drop-shadow-md">
                 Vidéos similaires 
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarVideos.map((simVideo) => (
                  <Link
                    to={`/video/${simVideo.id}`}
                    key={simVideo.id}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <motion.div
                      className="flex flex-col rounded-xl bg-white text-gray-700 shadow-md"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    >
                      <img
                        src={simVideo.imageurl || simVideo.imgurl || 'https://via.placeholder.com/400x300'}
                        alt={simVideo.title || simVideo.name || 'Untitled'}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-md font-medium text-gray-800 truncate">
                          {simVideo.title || simVideo.name || 'Untitled'}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CardsVideos;
