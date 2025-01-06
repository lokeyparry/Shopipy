import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import login from '../assets/login.png'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
    const [currState,setCurrState]=useState('Sign Up')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        try {
            if(currState === 'Sign Up'){
                const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                }else{
                    toast.error(response.data.error)
                }
            }else{
                const response = await axios.post(backendUrl+'/api/user/login',{email,password})
                
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                }else{
                    toast.error(response.data.error)
                }
                console.log(response.data);
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if(token){
            navigate('/')
        }
    }, [token])

  return (
    <div className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
        {/* container */}
        <div className="flex h-full w-full">
            {/* image */}
            <div className="w-1/2 hidden sm:block">
            <img src={login} alt="" className='object-cover h-full w-full' />
            </div>
        {/* form side0 */}
        <div className="flex w-full sm:w-1/2 items-center justify-center text-[90%]">
            <form onSubmit={onSubmitHandler} action="flex flex-col item-center w-[90%] sm:max-w-md m-auto gap-y-5">
                <div className="w-full mb-4">
                    <h3 className='bold-36'>{currState}</h3>
                </div>
                {currState === 'Sign Up' && (
                    <div className="w-full">
                        <label htmlFor="name" className='medium-14'>Name</label>
                        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1' required />
                    </div>  
                )}
                <div className="w-full">
                    <label htmlFor="email" className='medium-14'>Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1'required />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className='medium-14'>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1' required/>
                </div>
                <button type='submit' className='btn-dark w-full mt-5 !py-[8px]'>{currState === 'Sign Up'?'Sign Up':'Login'}</button>
                <div className="underline medium-15">
                    <div className="">Forgate your password?</div>
                    {currState==='Login'?(
                        <div className="underline medium-15">
                            Don't have an account?
                            <span onClick={()=>setCurrState('Sign Up')} className='cursor-pointer text-blue-800'>Create Account</span>
                        </div>
                    ):(
                        <div className="underline medium-15">Already have an account?
                        <span onClick={()=>setCurrState('Login')} className='cursor-pointer text-blue-800'> Login</span>
                        </div>
                    )}
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login