import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
export default function Admin() {
    const[form,setform] = useState([]);
    const[num,setnum] = useState(10)
    const[oldnum,setoldnum] = useState(0)
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get("https://feedback-website-backend-8bkr.onrender.com/feedbacks")
        .then(res=>setform(res.data))
    },[form.length])
    let list
    list =  form.map((item,key)=>{
        return <li key={key} className="border text-center flex-row flex gap-3 items-center justify-center w-[70%] h-12 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-2xl" onClick={()=>{
            navigate('/form',{state:{item}})
        }} >
             <p>{item.fullname}</p>
             <p className='font-extrabold' >{item.type}</p>
         </li>
})

  return (
    <div className='fixed w-screen h-screen inset-0 bg-blue-300 flex flex-col '>
       <h1 className='text-white font-extrabold text-6xl  top-0 right-[50%] text-center'>Admin</h1>
      
       <div className='h-[80%]'>
       <ul className=' flex items-center flex-col justify-center h-[100%] mt-10 gap-3'>
         
         {
             list.filter((item)=>(item.key<num && item.key>=oldnum)  )
         }
     
     </ul>
       </div>

        <div className=' flex flex-row justify-center w-full h-[5%]' >
        <div className='w-[20%] flex justify-between '>
        <FaArrowCircleLeft className='text-2xl active:scale-75 transition-all duration-150' onClick={()=>{
            if((!oldnum==0)){
                setoldnum(prev=>prev-10),
                setnum(prev=>prev-10)
            }
            
            
        }}  />
        <FaArrowCircleRight  className='text-2xl active:scale-75 transition-all duration-150' onClick={()=>{
             if(list.length > num){
            setoldnum(num),
            setnum(prev=>prev+10)
             }
        }}/>
        </div>
        </div>


      
    </div>
  )
}
