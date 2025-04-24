import React, { useState } from 'react'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import {ToastContainer , toast} from "react-toastify"
import axios from "axios"
function App() {
  const[item,setitem] = useState(1);
  const[email,setemail] = useState();
  const[code,setcode] = useState(0);
  const[usercode,setusercode] = useState(0);
  const otp = ()=>{
    axios.defaults.withCredentials = true
    axios.post('http://localhost:8080/verify',{email})
    .then(res=>{
      console.log(res.data)
      setcode(res.data)
      if(Number(res.data)){
        toast.success('OTP sent!')
      }
    })

  }
  const verify = ()=>{
    if(code.toString().trim() == usercode.toString().trim()){
      console.log('Success')
      toast.success("Verfied")
    }else{
      console.log('Wrong OTP')
      toast.error('Wrong OTP')
    }
  }
  console.log(code)
  return (
    <div className='h-screen w-screen bg-gradient-to-bl from-red-100 via-white to-pink-100'>
      <ToastContainer/>
      <nav className='bg-gradient-to-r from-pink-400 to-pink-600 h-12 text-white flex justify-center items-center font-ubuntu font-bold'>
        FEEDBACK FORM
      </nav>
   <div className='w-full h-full flex justify-center '>
   <div className='  max-w-[1000px] h-[80%] w-full justify-evenly items-center flex '>
     <div className='flex gap-9 items-center flex-col h-full mt-32 w-full'>
        <input type="text" className='border w-[60%] max-w-[80%] rounded-2xl h-[6%] pl-7 placeholder:text-gray-400 transition-all duration-300 focus:bg-gradient-to-r focus:from-gray-300 outline-0 focus:placeholder:text-white focus:placeholder:font-extrabold' placeholder='Enter your fullname'/>
        <input type="email" className='border w-[60%] rounded-2xl h-[6%] pl-7 placeholder:text-gray-400 focus:bg-gradient-to-r focus:from-gray-300 outline-0 focus:placeholder:text-white focus:placeholder:font-extrabold' placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)} />
        {code!=0?<input type='text' className='border text-center rounded-2xl w-[25%] h-9' placeholder='Enter OTP' onChange={e=>setusercode(e.target.value)}/> : ""}
        {
          code==0?<button className=' mt-0 pt-0 bg-gradient-to-br from-green-200 to-green-500 px-8 h-9 rounded-2xl transition-all duration-700 hover:bg-gradient-to-br hover:from-green-300 hover:to-green-600 hover:duration-500 hover:transition-all' onClick={otp}>Send OTP</button> : <button className=' mt-0 pt-0 bg-gradient-to-br from-green-200 to-green-500 px-8 h-9 rounded-2xl transition-all duration-700 hover:bg-gradient-to-br hover:from-green-300 hover:to-green-600 hover:duration-500 hover:transition-all' onClick={verify}>Verify</button>
        }
        <select name="select" id="" className='text-center outline-1 outline-gray-300 px-3 rounded-[6px]' onChange={e=>setitem(e.target.value)}  >
          <option className='text-center w-40' value="1">Bug</option>
          <option className='text-center w-40' value="2">Feature</option>
          <option className='text-center w-40' value="3">Feedback</option>
        </select>
        {item==1?<div className='flex flex-col gap-2 w-[70%] justify-center items-center '>
         <h7 className="text-gray-500">Add the image of bug you faced:</h7>
          <input type='file' className='border text-center justify-center flex rounded-[7px] w-[90%] px-10 h-8 mb focus:bg-gray-300 outline-0 focus:placeholder:text-white' />
          <textarea class="border h-56 w-full text-left align-top p-3 font-mono font-extrabold rounded-2xl placeholder:left placeholder:absolute focus:bg-gray-200 outline-0 focus:placeholder:text-gray-600 trnasition-all duration-300 focus:placeholder:font-extrabold" placeholder='What issue you had faced'></textarea>
          
          </div>:""}
          {item==2?<textarea className='border w-[70%] rounded-[10px] h-56 pt-2 pl-2 font-extrabold placeholder:font-bold  focus:placeholder:text-gray-600 trnasition-all duration-300 focus:placeholder:font-extrabold focus:bg-gray-200 outline-0' placeholder='Help as to improve our website'  /> :''}
          {item==3?<textarea className='border w-[70%] rounded-[10px] h-56 pt-2 pl-2 font-extrabold placeholder:font-bold  focus:placeholder:text-gray-600 trnasition-all duration-300 focus:placeholder:font-extrabold focus:bg-gray-200 outline-0' placeholder='Please tell your experience on our  webiste'  onChange={(e)=>console.log(e.target.value)} /> :""}
        <button type='submit' className='border px-5 rounded-b-2xl py-2 hover:bg-gray-400 transition-all duration-300 hover:rounded-t-2xl hover:rounded-b-none
        ' >Submit</button>
      </div>
     </div>
   </div>
    </div>
  )
}

export default App
