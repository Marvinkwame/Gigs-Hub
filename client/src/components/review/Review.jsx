import React from "react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Review.scss"

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="user">
          <img className="pp" src={data.img} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <BsFillHandThumbsUpFill />
        <span>Yes</span>
        <BsFillHandThumbsDownFill />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
