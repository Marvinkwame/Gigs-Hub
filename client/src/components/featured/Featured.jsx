import React from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import Freelancer from "../../assets/freelancer.png"
import "./Featured.scss"

const Featured = () => {
  return (
    <div className='hero'>
        <div className='container'>
            <div className="left">
                <h1>Hire top level freelancers for your business</h1>
                <div className='search'>
                    <div className="searchInput">
                        <AiOutlineSearch />
                        <input type="text" placeholder='Try "Ecommerce app"' />
                    </div>
                    <button>Search</button>
                </div>
                <div className="services">
                    <span>Popular Services:</span>
                    <button>WordPress</button>
                    <button>Web Design</button>
                    <button>Logo Design</button>
                    <button>Animations</button>
                </div>
            </div>
            <div className="right">
                <img src={Freelancer} alt="FREELANCER" />
                <p className='freelancer'>Eddie Howe, Graphic Designer</p>
            </div>
        </div>
    </div>
  )
}

export default Featured