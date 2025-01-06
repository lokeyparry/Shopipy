import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import Item from './Item'
import { ShopContext } from '../context/shopContext'

const RelatedProducts = ({category,subCategory}) => {
    const{products}=useContext(ShopContext)
    const[releted,setRelated]=useState([])
    useEffect(()=>{
        if(products.length>0){
            let filtered=products.slice()
            filtered=filtered.filter((item)=>category===item.category)
            filtered=filtered.filter((item)=>subCategory===item.subCategory)
            setRelated(filtered.slice(0,5))
        }
    },[products])
  return (
    <section className='py-16'>
        <Title title='Related' title2='Products' titleStyles='pb-4'/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {releted.map((product, index) => (
                <Item key={product._id} product={product} />
            ))}
        </div>
    </section>
  )
}

export default RelatedProducts