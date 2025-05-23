import React, { useState } from 'react';

const CommentSection = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment(''); 
  };

  return (
   <div
  className="bg-gray-100 backdrop-blur-md h-80 z-0 w-full text-black p-4 "
  style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
>
      <h2 className="text-xl font-semibold mb-4">Commentaire </h2>

      <form onSubmit={handleSubmit} className="flex items-center z-50 gap-2 bg-white  border-2  rounded-lg p-2 h-20">
        {/* Comment Input */}
        <input
          type="text"
          placeholder="Send a first comment..."
          className="flex-grow bg-transparent border-none focus:outline-none text-[#005DAA] placeholder-gray-400 p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="bg-[#EF7D00] hover:bg-[#f5a753] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[#f5a753]focus:ring-opacity-50"
        >
        Envoyer 
        </button>
      </form>
    </div>
  );
};

export default CommentSection;