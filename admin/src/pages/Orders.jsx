import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { backend_url, currency } from '../App'
import {toast} from 'react-toastify'
import {TfiPackage} from 'react-icons/tfi'

const Orders = ({token}) => {
  const[orders,setOrders]=useState([])
  const fetchAllOrders = async()=>{
    if(!token){
      return null
    }
    try {
      const response=await axios.post(backend_url+'/api/order/list',{},{headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders.reverse())
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const statusHandler = async(e,orderId)=>{
    try {
      const response = await axios.post(backend_url+'/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    fetchAllOrders()
  },[token])
  return (
    <div className="px-2 sm:px-8 mt-4 sm:mt-14">
      <div className="flex flex-col gap-4">
        {orders.map((order)=>(
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg" key={order._id}>
            <div className="flexCenter">
              <TfiPackage className="text-3xl bg-secondary"/>
            </div>
            <div className="">
              <div className="flex items-start gap-1">
                <div className="medium-14">Items:</div>
                <div className="flex flex-col relative top-0.5">
                  {order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    }else{
                      return <p key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    }
                  })}
                </div>
              </div>
              <p className='medium-14'><span className='text-tertiary'>Name:</span>{order.address.firstName + " " + order.address.lastName}</p>
              <p className='medium-14'>
                <span className='text-tertiary'>Address:</span>
                <span>{order.address.street + ", "+order.address.state + ", "+order.address.country+", "+order.address.zipcode}</span>
              </p>
              <p>{order.address.phone}</p>
            </div>
            <div className="">
            <p className="text-sm">Total: {order.item.length}</p>
            <p className="mt-3">Method: {order.paymentMethod}</p>
            <p className="">Payment:{order.payment?"Done":"Pending"}</p>
            <p className="">Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className="text-sm font-semibold">{currency}{order.amount}</p>
          <select onChange={(e)=>statusHandler(e.target,order._id)} value={order.status} className='text-sx font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary'>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders