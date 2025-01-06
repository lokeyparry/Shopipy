import React from 'react'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import Features from '../components/Features'
import Banner from '../components/Banner'
import PopularProducts from '../components/PopularProducts'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <NewArrivals />
      <Banner />
      <PopularProducts />
      <Blog />
      <Footer />

    </div>
  )
}

export default Home