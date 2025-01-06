import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import Item from './Item'

const PopularProducts = () => {
    const {products}=useContext(ShopContext)
    const[popularProduct,setPopularProduct]=useState([])
    useEffect(()=>{
        const data=products.filter(item=>item.popular)
        setPopularProduct(data.slice(0,5))
    },[])
  return (
    <section className='max-padd-container py-16 bg-primary'>
        <Title title={'Popular'} title2={'Products'} titleStyles={'pb-10'} paraStyles={'!block'}  />
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {popularProduct.map(product=>(
                <div key={product._id}>

                <Item product={product}/>
                </div>
            ))}
        </div>
    </section>
  )
}

export default PopularProducts