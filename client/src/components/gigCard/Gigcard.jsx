import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Gigcard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";

const Gigcard = ({ gig }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [gig.userId],
    queryFn: () =>
      newRequest.get(`/users/${gig.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${gig._id}`} className="link">
      <div className="gig-card">
        <img src={gig.cover} alt="" />
        <div className="info">
        {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="profile avatar" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{gig.desc}</p>
          <div className="star">
            <AiFillStar />
            <span>
              {!isNaN(gig.totalStars / gig.starNumber) &&
                Math.round(gig.totalStars / gig.starNumber)}
            </span>
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
  );
};

export default Gigcard;
