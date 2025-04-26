import React, { useEffect, useState } from 'react'
import {ToastContainer , toast} from "react-toastify"
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import axios from "axios"
function Home() {
  const[item,setitem] = useState(1);
  const[email,setemail] = useState("");
  const[code,setcode] = useState(0);
  const[usercode,setusercode] = useState(0);
  const[name,setname] = useState("")
  const[content,setcontent] = useState("")
  const[verfied,setverfied] = useState(false)
  const[bugimage,setbugimage] = useState("")
  const[view,setview] = useState("")
  const[disview,setdisview] = useState(-2000)
  const handlesubmit = ()=>{
    if(name.trim()=="") return toast.error("Full name required",{
      autoClose:2000
    })
    if(!verfied) return toast.error("Email not verified",{
      autoClose:2000
    })
    if(content.trim()=="") return toast.error("Enter your problem",{
      autoClose:2000
    })

    axios.post("http://localhost:8080/submit",{fullname:name,email:email,image:bugimage, message:content , type:item})
    .then(res=>{setview(res.data)
    if(res.data){
      toast.success("Form Submitted!")
   } })
    
  }
  const otp = ()=>{
    if(email.trim()=="") return toast.error("Email required",{
      autoClose:2000
    })
    const loadingtoast = toast.loading('Processing')
    axios.defaults.withCredentials = true
    axios.post('http://localhost:8080/verify',{email})
    .then(res=>{
      console.log(res)
      setcode(res.data)
      if(Number(res.data)){
        toast.update(loadingtoast,{
          isLoading:false,
          type:'success',
          render:"OTP Sent!",
          autoClose:2000
        })
      }
    })
  }
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''; // Required for Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };

  },[])

  const handlefile = (e)=>{
    if(e.target.value == "") return
    const upload = toast.loading('Uploading')

   let image = e.target.files[0]

   const file = new FormData()

   file.append(
    'file', image
   )
   axios.post('http://localhost:8080/bugupload',file)
   .then(res=>{
    if(res.data){
      setbugimage(res.data)
    toast.update(upload,{
      isLoading:false,
      render:"Image Uploaded!",
      autoClose:2000,
      type:"success"
    })
    }
    else{
      toast.update(upload,{
        isLoading:false,
        render:"Error on Uploading",
        autoClose:2500,
        type:"error"})
    }
    
   })

  }

  const verify = ()=>{
    if(code.toString().trim() == usercode.toString().trim()){
      setverfied(true)
      toast.success("Verfied")
    }else{
      toast.error('Wrong OTP')
    }
  }
  console.log(disview)
  return (
    <div className='h-screen w-screen fixed inset-0 bg-gradient-to-bl from-red-200 via-white to-pink-200 overflow-hidden'>
    <ToastContainer />
    <nav className='bg-gradient-to-r from-pink-400 to-pink-600 h-12 text-white flex justify-center items-center font-bold font-ubuntu fixed top-0 w-full z-50'>
      FEEDBACK FORM
    </nav>
  
    <div className='w-full h-full flex justify-center flex-col items-center pb-20 overflow-y-auto'>
      <div className='w-full max-w-[80%] h-[80%] flex justify-evenly items-center'>
        <div className='flex flex-col gap-6 items-center w-full'>
          <input
            type="text"
            className='border bg-gradient-to-r to-blue-100 w-[80%] max-w-[800px] min-h-12 rounded-2xl pl-4 pr-4 placeholder:text-gray-400 transition-all duration-300 focus:bg-gradient-to-r focus:from-gray-300 outline-none focus:placeholder:text-white focus:placeholder:font-extrabold'
            placeholder='Enter your fullname'
            value={name}
            onChange={e => setname(e.target.value)}
          />
          
          <div className='relative w-[100%] flex items-center justify-center'>
            <input
              type="email"
              className='border bg-gradient-to-r to-blue-100 w-[80%] max-w-[800px] min-h-12 rounded-2xl pl-4 pr-10 placeholder:text-gray-400 transition-all duration-300 focus:bg-gradient-to-r focus:from-gray-300 outline-none focus:placeholder:text-white focus:placeholder:font-extrabold'
              placeholder='Enter your email'
              onChange={(e) => {
                setemail(e.target.value);
                setverfied(false);
                setcode(0);
              }}
            />
            {verfied && (
              <IoCheckmarkDoneSharp className='absolute top-3 lg:right-[25%] sm:right-[15%] right-[15%]  md:right-[15%] text-green-600 text-2xl' />
            )}
          </div>
  
          {!verfied && (
            <div className='w-[60%] text-center'>
              {code !== 0 && (
                <input
                  type='password'
                  className='border text-center rounded-2xl w-[50%] max-w-[150px] h-9 outline-none mb-3'
                  placeholder='Enter OTP'
                  onChange={e => setusercode(e.target.value)}
                />
              )}
              <div>
                {code === 0 ? (
                  <button
                    className='bg-gradient-to-br from-green-200 to-green-500 px-8 h-9 rounded-2xl hover:from-green-300 hover:to-green-600 transition-all duration-500'
                    onClick={otp}
                  >
                    Send OTP
                  </button>
                ) : (
                  <button
                    className='bg-gradient-to-br from-green-200 to-green-500 px-8 h-9 rounded-2xl hover:from-green-300 hover:to-green-600 transition-all duration-500'
                    onClick={verify}
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          )}
  
          <select
            className='text-center border px-3 rounded-md'
            onChange={e => setitem(e.target.value)}
          >
            <option value="1">Bug</option>
            <option value="2">Feature</option>
            <option value="3">Feedback</option>
          </select>
  
          {item == 1 && (
            <div className='flex flex-col gap-2 w-[70%] items-center max-w-[1000px]'>
              <h5 className="text-gray-500 text-center">Add the image of bug you faced:</h5>
              <input
                type='file'
                className='border bg-cyan-50 rounded-md px-3 h-8 focus:bg-gray-300 outline-none w-[100%]'
                onChange={handlefile}
              />
              {bugimage && <img src={bugimage} className='w-60' alt="Bug" />}
              <textarea
                className="border h-56 w-[140%] max-w-[1200px] bg-gradient-to-r from-blue-100 p-3 font-mono font-extrabold rounded-2xl outline-none focus:bg-gray-200 placeholder:font-bold"
                placeholder='What issue you had faced '
                value={content}
                onChange={e => setcontent(e.target.value)}
              ></textarea>
            </div>
          )}
  
          {item == 2 && (
            <textarea
              className='border w-[90%] bg-blue-100 rounded-md h-56 p-3 font-bold outline-none focus:bg-gray-200 placeholder:font-bold'
              placeholder='Help us to improve our website'
              value={content}
              onChange={e => setcontent(e.target.value)}
            />
          )}
  
          {item == 3 && (
            <textarea
              className='border w-[90%] bg-blue-100 rounded-md h-56 p-3 font-bold outline-none focus:bg-gray-200 placeholder:font-bold'
              placeholder='Please tell your experience on our website'
              value={content}
              onChange={e => setcontent(e.target.value)}
            />
          )}
  
          <button
            className='border px-5 py-2 bg-gray-200 hover:bg-gray-400 transition-all duration-300 rounded-2xl '
            onClick={handlesubmit}
          >
            Submit
          </button>
  
          {view !== "" && (
            <div className='w-full text-center'>
              To view submitted form click{" "}
              <span
                className='text-blue-500 cursor-pointer underline'
                onClick={() => setdisview(0)}
              >
                here
              </span>
            </div>
          )}
  
          {view !== "" && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${disview === -2000 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className='w-[90%] max-w-xl h-[50%] overflow-y-auto py-5 px-5 backdrop-blur-lg border bg-gray-100 text-center rounded-2xl shadow-2xl shadow-black relative flex flex-col justify-evenly gap-3 '>
                <p>Full name: {view.fullname}</p>
                <p>Email: <span className='text-blue-700'>{view.email}</span></p>
                <p>Type: <span className='text-blue-700'>{view.type}</span></p>
                <p>Message: <span className='text-blue-700'>{view.message}</span></p>
                <button
                  className='absolute top-2 right-5 font-bold'
                  onClick={() => setdisview(-2000)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='h-20 bg-gray-700 text-center flex items-center  text-gray-400 font-extrabold w-full bottom-0 absolute justify-evenly flex-col '>
        <p>Damodara Prakash P</p>
        <a href="mailto:damodara2006@gmail.com">damodara2006@gmail.com</a>
        <p><a href="https://nsezfgdhttituosvrecd.supabase.co/storage/v1/object/sign/mydocuments/Damodara_Prakash_P_Resume.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U5Y2Q1NjE1LWZkMjQtNDAxYS04NDUxLTI0YmY3YTc0YmI5NiJ9.eyJ1cmwiOiJteWRvY3VtZW50cy9EYW1vZGFyYV9QcmFrYXNoX1BfUmVzdW1lLnBkZiIsImlhdCI6MTc0NTY1MTQxOSwiZXhwIjoxNzU0MjkxNDE5fQ.pSpjXHqcWzR_B3bGJTFoQmXQP4sdzsObw6uYjMjmnCs">Resume</a></p>
      </footer>
    </div>
  </div>
    
  )
}

export default Home
