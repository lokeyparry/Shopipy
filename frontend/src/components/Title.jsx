import React from 'react'

const Title = ({title, title2, titleStyles, paraStyles}) => {
  return (
    <div className={`${titleStyles} pb-1`}>
        <h3 className={`${titleStyles} h3`}>
            {title}
            <span className="text-secondary !font-light">
                {title2}
            </span>
        </h3>
        <p className={`${paraStyles} hidden`}>
            Discover the best deal on top Quality products, Crafted <br />
            to elvate your everyday experience.
        </p>
        
    </div>
  )
}

export default Title