import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div>
      <div className="flex justify-center font-bold text-4xl my-4">
        <p>Connections</p>
      </div>
      <div>
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about } = connection;
          return (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-sm mx-auto w-1/3 my-10  m-2 "
            >
              <figure>
                <img
                  className="w-20 h-20 rounded-full mx-1 mb-20 ml-5  "
                  src={photoUrl}
                  alt="photo"
                />
              </figure>
              <div className="card-body  ">
                <h2 className="card-title text-xl">
                  {firstName + " " + lastName}
                </h2>
                <p className="max-w-sm">{about}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Message</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
