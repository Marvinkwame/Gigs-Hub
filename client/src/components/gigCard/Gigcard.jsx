import React from 'react'
import { AiFillStar } from "react-icons/ai"
import "./Gigcard.scss"
import { Link } from 'react-router-dom'

const Gigcard = ({ gig }) => {
    return (
        <Link to="/gig/123" className='link'>
        <div className='gig-card'>
            <img src={gig.cover} alt="" />
            <div className='info'>
                <div className="user">
                    <img src={gig.pp} alt="" />
                    <span>{gig.username}</span>
                </div>

                <p>{gig.desc}</p>
                <div className="star">
                    <AiFillStar />
                    <span>{gig.star}</span>
                </div>
            </div>
            <hr />
            <div className="detail">

                <div className="price">
                    <span>STARTING AT</span>
                    <h2>
                        $ {gig.price}
                        <sup>99</sup>
                    </h2>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default Gigcard