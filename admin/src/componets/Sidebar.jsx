import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import {MdFactCheck} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'
import {FaListAlt} from 'react-icons/fa'

const Sidebar = ({setToken}) => {
  return (
    <div className='max-sm:flexCenter max-xs:pb-3 rounded bg-white pb-3 sm:w-1/5 sm:min-h-screen'>
        <div className="flex flex-col gap-y-6 max-sm:items-center sm:flex-col pt-4 sm:pt-14">
            <Link to={'/'} className='bold-22 xl:bottom-32 sm:pl-2 lg:pl-12'>Shopi <span className='text-secondary'>py</span></Link>
            <div className="flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10">
                <NavLink to={'/'} className={({isActive})=>isActive ? "active-link":"flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl "}>
                <FaSquarePlus className=''/>
                <div className="hidden lg:flex">Add Item</div>
                </NavLink>
                <NavLink to={'/list'} className={({isActive})=>isActive ? "active-link":"flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl "}>
                <FaListAlt className=''/>
                <div className="hidden lg:flex">List</div>
                </NavLink>
                <NavLink to={'/orders'} className={({isActive})=>isActive ? "active-link":"flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl "}>
                <MdFactCheck className=''/>
                <div className="hidden lg:flex">Orders</div>
                </NavLink>
                <div className="max-sm:ml-5 sm:mt-72">
                    <button onClick={()=>setToken("")} className='flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500'>
                        <BiLogOut className='text-lg'/>
                        <div className="hidden lg:flex">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar