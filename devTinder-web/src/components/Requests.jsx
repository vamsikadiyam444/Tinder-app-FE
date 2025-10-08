import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;
  return (
    <div>
      <div className="flex justify-center font-bold text-4xl my-4">
        <p>Requests</p>
      </div>
      <div>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-sm mx-auto w-1/3 my-10  "
            >
              <figure>
                <img
                  className="w-20 h-20 rounded-full mx-1  mb-30 ml-4   "
                  src={photoUrl}
                  alt="photo"
                />
              </figure>
              <div className="card-body  ">
                <h2 className="card-title text-xl">
                  {firstName + " " + lastName}
                </h2>
                <p className="max-w-sm">{about}</p>
                <div className="card-actions justify-end ">
                  <button
                    className="btn btn-secondary m-2"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
