import React from 'react'

const ProductDescription = () => {
  return (
    <div className='ring-1 ring-sky-900/10 rounded-lg '>
        <div className="flex gap-3">
            <button className="medium-14 p-3 w-32 border-b-2 border-secondary">Description</button>
            <button className="medium-14 p-3 w-32">Care Guide</button>
            <button className="medium-14 p-3 w-32">Size Guide</button>
        </div>
        <hr className='h-[1px] w-full'/>
        <div className="flex flex-col gap-3 p-3">
            <div>
                <h5 className="h5">Details</h5>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero animi eaque accusantium perspiciatis quasi, commodi pariatur, fugit numquam doloribus odit in beatae? Neque, modi? Explicabo, aliquid modi? Reprehenderit, ab et?</p>
                <p className='text-sm'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum numquam commodi quia aspernatur, aliquam tempore deleniti.
                </p>
            </div>
            <div>
                <h5 className='h5'>Benefits</h5>
                <ul className="list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1">
                    <li>High Quality materials ensure long-lasting durability and comfort.</li>
                    <li>Designed to meet the need of modern, active lifeStyles.</li>
                    <li>Availble in wide range of size and trendy colour.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductDescription