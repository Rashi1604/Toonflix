import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer/Footer';

const CategoryVideos = () => {
  const { id } = useParams(); // category id from URL
  const [videos, setVideos] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 const truncate = (text, maxLength = 25) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength - 2) + '...' : text;
};
  useEffect(() => {
    setLoading(true);

    axios.get('https://kids.toon-flix.com/videoFrench')
      .then(res => {
        const allVideos = res.data.videos || [];
        const categories = res.data.categories || [];

        console.log("Category ID from URL:", id);
        console.log("All videos:", allVideos);
        console.log("All categories:", categories);

        // Find the category object from categories by id from URL
        const category = categories.find(c => c.id?.toString() === id.toString());
        setCategoryName(category?.name || 'Category');

        // Get sub_cat_id from category for filtering videos
        const subCatId = category?.sub_cat_id?.toString();

        console.log("Category found:", category);
        console.log("Filtering videos with sub_category_id:", subCatId);

        // Filter videos by matching sub_category_id with category's sub_cat_id
        const filteredVideos = allVideos.filter(
          v => v.sub_category_id?.toString() === subCatId
        );

        console.log("Filtered videos:", filteredVideos);
        setVideos(filteredVideos);
      })
      .catch(err => {
        console.error("Error fetching category:", err);
        setVideos([]);
        setCategoryName("Category");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 mt-10">
        {/* <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Gallery</Link> */}

        <h1 className="text-3xl font-bold text-center text-[#EF7D00] mb-6">
          {categoryName} Videos
        </h1>

        {loading ? (
          <div className="w-full gap-x-2 flex justify-center items-center py-10">
            <div className="w-5 bg-[#ffd1a0] animate-pulse h-5 rounded-full animate-bounce" />
            <div className="w-5 animate-pulse h-5 bg-[#e59845] rounded-full animate-bounce" />
            <div className="w-5 h-5 animate-pulse bg-[#e27500] rounded-full animate-bounce" />
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center">No videos found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link to={`/video/${video.id}`} key={video.id}>
                <motion.div
                  className="flex flex-col rounded-xl bg-white text-gray-700 shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <img
                    src={video.imgurl}
                    alt={video.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{truncate(video.name)}</h2>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {!loading && (
          
          <div className='flex justify-center mt-8'>
          
            <button
              onClick={() => navigate('/')}
              className="bg-[#EF7D00] text-center w-48 rounded-2xl h-14 relative text-white text-xl font-semibold group"
              type="button"
            >
              <div className="bg-[#ffd3a3] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
                </svg>
              </div>
              <p className="translate-x-2"> Retour </p>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryVideos;
