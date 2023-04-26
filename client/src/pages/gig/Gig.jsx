import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { AiFillStar, AiFillClockCircle } from "react-icons/ai";
import {
  BsArrowRight,
  BsArrowRepeat,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { TiImage, TiTick } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/singlegig/${id}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  const userId = data?.userId; //getting the user inforamtion by using the id 

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        console.log(dataUser);
        return res.data;
      }),
    enabled: !!userId, //only use this when userId exists
  });
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Gigsters': Graphics & Design </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={
                    dataUser.img ||
                    "https://img.freepik.com/free-icon/user_318-563642.jpg?w=2000"
                  }
                  alt="profile pic"
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <AiFillStar key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((image) => (
                <img key={image} src={image} alt="gig pics" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "Soemthing went wrong"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={
                      dataUser.img ||
                      "https://img.freepik.com/free-icon/user_318-563642.jpg?w=2000"
                    }
                    alt=""
                  />
                  <div className="info">
                    <span>
                      {dataUser.username.charAt(0).toUpperCase() +
                        dataUser.username.slice(1)}
                    </span>
                    <div className="stars">
                      <AiFillStar />
                      <span>5</span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">
                        {dataUser.country.charAt(0).toUpperCase() +
                          dataUser.country.slice(1)}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <AiFillClockCircle />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <BsArrowRepeat />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <TiTick />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>
              Continue <BsArrowRight />
            </button>
            <p className="note">Compare packages</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
