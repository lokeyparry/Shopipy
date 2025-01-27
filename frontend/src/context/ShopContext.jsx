import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ShopContext = createContext()
const ShopContextProvider = (props) => {
    const currency = "$"
    const delivery_charges=10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate  = useNavigate()
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [token, setToken] = useState('')
    const [showSearch, setshowSearch] = useState(true)
    const [cartItems, setCartItems] =useState({})
    
    // Add to cart
    const addToCart=async(itemId, size)=>{
      if(!size){
        toast.error('Please select a size first!')
        return
      }
      let cartData=structuredClone(cartItems)
      
      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size]+=1
        }else{
          cartData[itemId][size]=1
        }
      }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
      }
      setCartItems(cartData)

      if(token){
        try {
          await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
        } catch (error) {
          console.error(error)
          toast.error(error.message)
        }
      }
    }
    // useEffect(()=>{
    //   setCartItems(cartItems)
    // },[cartItems])

    // get cart count
    const getCartCount=()=>{
      let totalCount=0
      for(const items in cartItems){
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item]>0){
              totalCount+=cartItems[items][item]
            }
          } catch (error) {
            console.log(error);
            
          }
        }
      }
      return totalCount
    }

    const updateQuantity = async(itemId, size, quantity)=>{
      let cartData = structuredClone(cartItems)
      cartData[itemId][size]=quantity
      setCartItems(cartData)
      if(token){
        try {
          await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
        } catch (error) {
          console.error(error)
          toast.error(error.message)
        }
      }
    }

    const getCartAmount=()=>{
      let totalAmount = 0 
      for (const items in cartItems){
        let itemInfo = products.find((product)=>product._id===items)
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item]>0){
              totalAmount+=cartItems[items][item]*itemInfo.price
            }
          } catch (error) {
            console.log(error);
            
          }
        }
      }
      return totalAmount
    }

    const getProductsData = async()=>{
      try {
        const response=await axios.get(backendUrl+'/api/product/list')
        // console.log(response.data);
        
        if(response.data.success){
          setProducts(response.data.products)
        } else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    const getUserCart = async(token)=>{
      try {
        const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
        if(response.data.success){
          setCartItems(response.data.cartData)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }

    useEffect(()=>{
      if(!token && localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        getUserCart(localStorage.getItem("token"));
      }
      getProductsData()
    })
    
    const value = {currency, delivery_charges, navigate, products, search, setSearch, showSearch, setshowSearch, token, setToken,addToCart,getCartCount,cartItems,setCartItems,updateQuantity,getCartAmount,backendUrl,getUserCart}

  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider