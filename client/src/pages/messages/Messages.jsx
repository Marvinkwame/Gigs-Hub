import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Messages.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import newRequest from "../../utils/newRequest";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        console.log(res.data)
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((chat) => (
              <tr
                className={
                  ((currentUser.isSeller && !chat.readBySeller) ||
                    (!currentUser.isSeller && !chat.readByBuyer)) &&
                  "active"
                }
                key={chat._id}
              >
                <td>{currentUser.isSeller ? chat.buyerId : chat.sellerId}</td>
                <td>
                  <Link to="/message/123" className="link">
                    {chat.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(chat.updatedAt).fromNow()}</td>
                <td>
                {((currentUser.isSeller && !chat.readBySeller) ||
                    (!currentUser.isSeller && !chat.readByBuyer)) && (
                    <button onClick={() => handleRead(chat.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
