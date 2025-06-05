// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie'
// const CommentSection = () => {
//   const [comment, setComment] = useState('');
//   const ani=Cookies.get("number")
//   const { id } = useParams();

//   const [allComments,setAllComments]=useState(null)

//     const getComments=()=>{
//      axios.get(`https://kids.toon-flix.com/getcomments?videoid=${id}`).then((res)=>{
//         console.log(res.data.comments,"----res---")
//         setAllComments(res.data.comments)

//     })
//   }
 
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const data ={
//     "ani":ani,
//     "videoid":id,
//     "comment":comment
 
//     }
//     await axios.post('https://kids.toon-flix.com/postcomment',data).then((res)=>{
//       console.log(res,"---comm----")
//     })



//     getComments()
//     console.log("Comment submitted:", comment);
//     setComment(''); 
//   };




//    useEffect(()=>{
//    getComments()
//   },[id])

//   return (
//    <div
//   className="bg-gray-100 backdrop-blur-md h-80 z-0 w-full text-black p-4 "
//   style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
// >
//       <h2 className="text-xl font-semibold mb-4">Commentaire </h2>

//       <form onSubmit={handleSubmit} className="flex items-center z-50 gap-2 bg-white  border-2  rounded-lg p-2 h-20">
//         {/* Comment Input */}
//         <input
//           type="text"
//           placeholder="Send a first comment..."
//           className="flex-grow bg-transparent border-none focus:outline-none text-black placeholder-gray-400 p-2"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />

//         {/* Send Button */}
//         <button
//           type="submit"
//           className="bg-[#EF7D00] hover:bg-[#f5a753] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[#f5a753]focus:ring-opacity-50"
//         >
//         Envoyer 
//         </button>
//       </form>

//       {/* <div className='bg-white'>
//         {
//           allComments?.map((item)=>(
//             <p>{item}</p>
//           ))
//         }

//       </div> */}
//       <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//   {allComments?.map((item, index) => (
//     <div
//       key={index}
//       className="flex items-start space-x-4 p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
//     >
//       {/* User Icon */}
//       <div className="flex-shrink-0">
//         <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
//           {/* You can use a user initial or an emoji/icon */}
//           👤
//         </div>
//       </div>

//       {/* Comment Text */}
//       <div className="flex-1">
//         <p className="text-gray-800">{item}</p>
//       </div>
//     </div>
//   ))}
// </div>
//     </div>
//   );
// };

// export default CommentSection;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const ani = Cookies.get("number")
  const { id } = useParams();
  const [allComments, setAllComments] = useState(null);
  const [showAll, setShowAll] = useState(false); // Toggle for showing all comments

  const getComments = () => {
    axios.get(`https://kids.toon-flix.com/getcomments?videoid=${id}`).then((res) => {
      console.log(res.data.comments, "----res---")
      setAllComments(res.data.comments)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "ani": ani,
      "videoid": id,
      "comment": comment
    }
    await axios.post('https://kids.toon-flix.com/postcomment', data).then((res) => {
      console.log(res, "---comm----")
    })

    getComments()
    console.log("Comment submitted:", comment);
    setComment('');
  };

  useEffect(() => {
    getComments()
  }, [id]);

  const visibleComments = showAll ? allComments : allComments?.slice(0, 2);

  return (
    <div
      className="bg-gray-100 backdrop-blur-md h-80 z-0 w-full text-black p-4 "
      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
    >
      <h2 className="text-xl font-semibold mb-4">Commentaire </h2>

      <form onSubmit={handleSubmit} className="flex items-center z-50 gap-2 bg-white border-2 rounded-lg p-2 h-20">
        <input
          type="text"
          placeholder="Send a first comment..."
          className="flex-grow bg-transparent border-none focus:outline-none text-black placeholder-gray-400 p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#EF7D00] hover:bg-[#f5a753] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[#f5a753]focus:ring-opacity-50"
        >
          Envoyer
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-4">
        {visibleComments?.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                👤
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{item}</p>
            </div>
          </div>
        ))}
        {/* {allComments?.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:underline text-sm mt-2"
          >
            {showAll ? 'See less' : 'See more'}
          </button>
        )} */}
      </div>
    </div>
  );
};

export default CommentSection;
