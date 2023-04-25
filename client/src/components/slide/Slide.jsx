import React, { Children } from 'react';
import Slider from 'infinite-react-carousel';
import "./Slide.scss"

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className='slide-section'>
      <h3 className='slide-title'>Popular professional services</h3>
      <div className='slide'>
        <div className="container">
          <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
            {children}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Slide