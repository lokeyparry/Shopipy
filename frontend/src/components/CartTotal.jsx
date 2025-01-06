import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {getCartAmount,currency,delivery_charges}=useContext(ShopContext)
  return (
    <section className='w-full'>
        <Title title={'Cart'} title2={'Total'} titleStyles={'h3'} />
        <div className="flexBetween pt-3">
            <h5 className='h5'>Subtotal: </h5>
            <p className='h5'>{currency}{getCartAmount()}.00</p>
        </div>
        <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
        <div className="flexBetween pt-3">
            <h5 className='h5'>Shipping Fee: </h5>
            <p className='h5'>{getCartAmount()===0 ? '0.00':`${currency}${delivery_charges}.00`}</p>
        </div>
        <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
        <div className="flexBetween pt-3">
            <h5 className='h5'>Total: </h5>
            <p className='h5'>{currency}{getCartAmount()===0 ? '0.00':getCartAmount()+delivery_charges}.00</p>
        </div>
    </section>
  )
}

export default CartTotal