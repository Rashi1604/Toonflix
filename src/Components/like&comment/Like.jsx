import React from 'react'
import "./Like.css";
import CommentSection from './CommentSection';
const Like = () => {
  return (
    <>
    <div className='w-full bg-black h-12 flex justify-start items-center gap-0'>
        <label className="ui-like">
        <input type="checkbox" />
        <div className="like ml-7">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill   height="48" ><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"><path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" /></g></svg>
        </div>
        </label>
        <div>
            <span className="absolute -mt-5 text-white px-3 rounded-lg py-2 text-sm font-bold ">
   Comme  <span> </span>
        </span>
        </div>
        {/* comment */}
         <div className="group relative">
  <button className='ml-20'>
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={23}
      width={44}
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 stroke-white"
      fill="none"
    >
      <path fill="none" d="M0 0h24v24H0z" stroke="none" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
    </svg>
  </button>
<span className="absolute  origin-left  text-white px-2 rounded-lg  text-md font-bold ">
    Commentaire </span>
  </div>

    </div>
      <CommentSection/>
      </>
  )
}

export default Like;
