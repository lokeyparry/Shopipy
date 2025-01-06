import React from 'react'
import Title from '../components/Title'
import { FaStar,FaCheck } from 'react-icons/fa6'
import user1 from '../assets/testimonials/user1.png'
import user2 from '../assets/testimonials/user2.png'
import product1 from '../assets/product_1.png'
import product2 from '../assets/product_2_1.png'
import product3 from '../assets/product_3.png'
import product4 from '../assets/product_6.png'
import Footer from '../components/Footer'

const Testimonials = () => {
  return (
    <div>
      <div className='bg-primary mb-16'>
        <div className='max-padd-container py-10'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-20 mb-16 rounded-2xl'>
            <div className='flex flex-col justify-between items-start gap-10'>
              <Title title={'What People'} title2={'Says'} titleStyles={'pb-10'} paraStyles={'!block'} />
              <div className="flex flex-col gap-1 bg-white p-2 rounded">
                <div className="flex text-secondary gap-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="medium-14">more than <b>+25,000 reviews</b></div>
              </div>
            </div>
            {/* Right side reviews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {/* card reviews */}
              <div className="flex flex-col gap-1 bg-white p-4 rounded-lg">
                <div className="flexBetween">
                  <div className="flexCenter gap-x-2">
                    <img src={user1} alt="" height={44} width={44} className='rounded-full' />
                    <h5 className='bold-14'>John Doe</h5>
                  </div>
                  <div className="bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold">
                    <FaCheck />
                    Verified
                  </div>
                </div>
                <hr className='h-[1px] w-full my-2'/>
                <div className="flex gap-x-1 text-secondary mt-5 mb-1 text-xs">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <h4 className='h4'>High Quality</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur placeat earum voluptatem ut. Quisquam, accusamus reiciendis autem dolore maxime nostrum, omnis nobis quam magni molestiae doloremque soluta ab quae. Esse.</p>
                <div className="flex gap-x-1 mt-5">
                  <img src={product1} alt="" className='rounded aspect-square object-cover' height={44} width={44} />
                  <img src={product2} alt="" className='rounded aspect-square object-cover' height={44} width={44} />
                </div>
              </div>
              <div className="flex flex-col gap-1 bg-white p-4 rounded-lg">
                <div className="flexBetween">
                  <div className="flexCenter gap-x-2">
                    <img src={user2} alt="" height={44} width={44} className='rounded-full' />
                    <h5 className='bold-14'>Lokey Parry</h5>
                  </div>
                  <div className="bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold">
                    <FaCheck />
                    Verified
                  </div>
                </div>
                <hr className='h-[1px] w-full my-2'/>
                <div className="flex gap-x-1 text-secondary mt-5 mb-1 text-xs">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <h4 className='h4'>Modern Design</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur placeat earum voluptatem ut. Quisquam, accusamus reiciendis autem dolore maxime nostrum, omnis nobis quam magni molestiae doloremque soluta ab quae. Esse.</p>
                <div className="flex gap-x-1 mt-5">
                  <img src={product3} alt="" className='rounded aspect-square object-cover' height={44} width={44} />
                  <img src={product4} alt="" className='rounded aspect-square object-cover' height={44} width={44} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Testimonials