import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"

const Login = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",password:""
  });
//   const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [toastify,setToastify] = useState(false);

  const changeHandler = (event) =>{
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  };


  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      dispatch(signInStart());
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // console.log(data);
        toast.error("Invalid User");
        return;
      }
      setToastify(true);
      dispatch(signInSuccess(data));
       navigate('/');
      // navigate('/');
      // dispatch(signInSuccess(toast.success("Sign In successfully..")));
      // setLoading(false);
      // setError(null);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      // dispatch(signInFailure(toast.error("Invalid User...")));
    }
  };


  const guestHandler = () =>{
        formData.email = "guest@example.com",
        formData.password = "12345678"
  }
  
  return (
    // bg-[#F1F5F1]
    <div className='text-white fixed h-screen overflow-hidden w-screen flex justify-center  bg-cover bg-no-repeat py-20' 
    >
      
      <div className="bg-white border border-s1ate-400 rounded-md px-8 shadow-2xl backdrop-filter backdrop-blur-3xl bg-opacity-70 relative py-2 h-[450px]">

      <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl text-black text-center font-semibold my-9'>Sign In</h1>

      <form onSubmit={submitHandler} className='flex flex-col gap-4 w-[450px]'>

        <input type='email' placeholder='email' className='border p-3 rounded-lg  text-black' id='email' onChange={changeHandler}/>

        <input type='password' placeholder='password' className='text-black border p-3 rounded-lg' id='password' onChange={changeHandler}/>

        <button disabled={loading} className='bg-black font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <button disabled={loading} className='bg-red-500 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        onClick={guestHandler}>
          {loading ? 'Loading...' : 'Get Guest user Uredentials'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p className='text-black'>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700 font-medium'>Sign up</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error} </p>} */}
      {/* {/* {toast && toast.error("Invalid User")} */}
       {/* {toastify && toast.success("Sign In successfully..")} */}
          {/* {toastify && (
            <div>
              {toast.success("Sign In successfully..")}
              {setToastify(false)}
            </div>
          )} */}
    </div>

      </div>
    </div>
  )
}

export default Login;
