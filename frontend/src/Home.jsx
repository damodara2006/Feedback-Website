import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import axios from 'axios'

function Home() {
  const [item, setitem] = useState(1)
  const [email, setemail] = useState('')
  const [code, setcode] = useState(0)
  const [usercode, setusercode] = useState(0)
  const [name, setname] = useState('')
  const [content, setcontent] = useState('')
  const [verfied, setverfied] = useState(false)
  const [bugimage, setbugimage] = useState('')
  const [view, setview] = useState('')
  const [disview, setdisview] = useState(-2000)

  const handlesubmit = () => {
    if (!name.trim()) return toast.error('Full name required', { autoClose: 2000 })
    if (!verfied) return toast.error('Email not verified', { autoClose: 2000 })
    if (!content.trim()) return toast.error('Enter your problem', { autoClose: 2000 })

    axios.post('https://feedback-website-backend-8bkr.onrender.com/submit', { fullname: name, email, image: bugimage, message: content, type: item })
      .then(res => {
        setview(res.data)
        if (res.data) toast.success('Form Submitted!')
      })
  }

  const otp = () => {
    if (!email.trim()) return toast.error('Email required', { autoClose: 2000 })
    const loadingtoast = toast.loading('Processing')
    axios.defaults.withCredentials = true
    axios.post('https://feedback-website-backend-8bkr.onrender.com/verify', { email })
      .then(res => {
        setcode(res.data)
        if (Number(res.data)) {
          toast.update(loadingtoast, { isLoading: false, type: 'success', render: 'OTP Sent!', autoClose: 2000 })
        }
      })
  }

  useEffect(() => {
    const handleBeforeUnload = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handlefile = e => {
    if (!e.target.files?.length) return
    const upload = toast.loading('Uploading')
    const file = new FormData()
    file.append('file', e.target.files[0])
    axios.post('https://feedback-website-backend-8bkr.onrender.com/bugupload', file)
      .then(res => {
        if (res.data) {
          setbugimage(res.data)
          toast.update(upload, { isLoading: false, render: 'Image Uploaded!', autoClose: 2000, type: 'success' })
        } else {
          toast.update(upload, { isLoading: false, render: 'Error on Uploading', autoClose: 2500, type: 'error' })
        }
      })
  }

  const verify = () => {
    if (code.toString().trim() === usercode.toString().trim()) {
      setverfied(true)
      toast.success('Verfied')
    } else {
      toast.error('Wrong OTP')
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-bl from-red-300 via-white to-pink-300'>
      <ToastContainer />

 
      <nav className='bg-gradient-to-r from-pink-500 to-pink-700 h-12 flex items-center justify-center text-white font-bold fixed top-0 w-full z-50'>
        FEEDBACK FORM
      </nav>

   
      <main className='flex-grow pt-12 overflow-auto'>
        <div className='w-full flex justify-center pb-20'>
          <div className='w-full max-w-[90%] flex flex-col items-center space-y-6 mt-20 px-10'>

            <input
              type='text'
              placeholder='Enter your fullname'
              value={name}
              onChange={e => setname(e.target.value)}
              className='w-full sm:w-[80%] max-w-[800px] border bg-gradient-to-r to-blue-100 rounded-2xl px-4 py-2 placeholder-gray-400 focus:outline-none focus:bg-gradient-to-r focus:from-gray-300 focus:placeholder-white'
            />

         
            <div className='relative w-full sm:w-[80%] max-w-[800px]'>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => { setemail(e.target.value); setverfied(false); setcode(0) }}
                className='w-full border bg-gradient-to-r to-blue-100 rounded-2xl px-4 py-2 pr-10 placeholder-gray-400 focus:outline-none focus:bg-gradient-to-r focus:from-gray-300 focus:placeholder-white'
              />
              {verfied && <IoCheckmarkDoneSharp className='absolute top-2 right-4 text-green-600 text-2xl' />}
            </div>

            {!verfied && (
              <div className=' w-30 flex justify-center  flex-col items-center gap-3'>
                {code !== 0 && (
                  <input
                    type='password'
                    placeholder='Enter OTP'
                    onChange={e => setusercode(e.target.value)}
                    className='flex-1 border rounded-2xl px-3 py-2 w-30 text-center placeholder-gray-400 focus:outline-none'
                  />
                )}
                <button
                  onClick={code === 0 ? otp : verify}
                  className='px-6 py-2 bg-gradient-to-br from-green-200 to-green-500 rounded-2xl hover:from-green-300 hover:to-green-600 transition-all'
                >
                  {code === 0 ? 'Send OTP' : 'Verify'}
                </button>
              </div>
            )}

          
            <select
              value={item}
              onChange={e => setitem(Number(e.target.value))}
              className='border px-3 rounded-md w-[150px] '
            >
              <option value={1}>Bug</option>
              <option value={2}>Feature</option>
              <option value={3}>Feedback</option>
            </select>

           
            {item === 1 && (
              <div className='w-full sm:w-[70%] max-w-[1000px] flex flex-col items-center space-y-4'>
                <h5 className='text-gray-500 text-center'>Add the image of bug you faced:</h5>
                <input
                  type='file'
                  onChange={handlefile}
                  className='w-full border bg-cyan-50 rounded-md px-3 py-2 focus:bg-gray-300 max-w-[600px] '
                />
                {bugimage && <img src={bugimage} alt='Bug' className='w-60 rounded-lg' />}
                <textarea
                  placeholder='What issue you had faced'
                  value={content}
                  onChange={e => setcontent(e.target.value)}
                  className='w-full border bg-gradient-to-r from-blue-100 rounded-md px-4 py-2 h-40 resize-none focus:bg-gray-200 font-extrabold'
                />
              </div>
            )}

            {(item === 2 || item === 3) && (
              <textarea
                placeholder={item === 2 ? 'Help us to improve our website' : 'Please tell your experience on our website'}
                value={content}
                onChange={e => setcontent(e.target.value)}
                className='w-full sm:w-[70%] max-w-[1000px] bg-blue-100 border rounded-md h-40 p-3 focus:bg-gray-200 font-extrabold'
              />
            )}

            <button
              onClick={handlesubmit}
              className='border px-5 py-2 bg-gray-200 hover:bg-gray-400 rounded-2xl transition-all'
            >
              Submit
            </button>

            {view && (
              <div className='w-full text-center'>
                To view submitted form click{' '}
                <span onClick={() => setdisview(0)} className='text-blue-500 underline cursor-pointer'>
                  here
                </span>
              </div>
            )}

         
            {view && (
              <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
                disview === -2000 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <div className='w-[90%] max-w-xl  overflow-y-auto backdrop-blur-lg border bg-gray-100 text-center rounded-2xl shadow-2xl relative p-5 space-y-3'>
                  <p>Full name: {view.fullname}</p>
                  <p>Email: <span className='text-blue-700'>{view.email}</span></p>
                  <p>Type: <span className='text-blue-700'>{view.type}</span></p>
                  <p>Message: <span className='text-blue-700'>{view.message}</span></p>
                  <button onClick={() => setdisview(-2000)} className='absolute top-2 right-5 font-bold'>Close</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

 
      <footer className='bg-gray-700 text-gray-400 text-center h-20 flex items-center justify-center'>
        <div className='space-y-1'>
          <p>Damodara Prakash P</p>
          <a href='mailto:damodara2006@gmail.com'>damodara2006@gmail.com</a>
          <p><a href='https://nsezfgdhttituosvrecd.supabase.co/storage/v1/object/sign/mydocuments/Damodara_Prakash_P_Resume.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U5Y2Q1NjE1LWZkMjQtNDAxYS04NDUxLTI0YmY3YTc0YmI5NiJ9.eyJ1cmwiOiJteWRvY3VtZW50cy9EYW1vZGFyYV9QcmFrYXNoX1BfUmVzdW1lLnBkZiIsImlhdCI6MTc0NTY3MzE1MiwiZXhwIjo0ODk5MjczMTUyfQ.XMIhWZ9iV6X0AGeY8RRJVnYax3tZ7yk_6Rp-t2nyGDg'>Resume</a></p>
        </div>
      </footer>
    </div>
  )
}

export default Home