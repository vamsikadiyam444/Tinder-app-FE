import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return;
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const requestSend = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send" + "/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>{photoUrl && <img src={photoUrl} alt="photo" />}</figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center m-4">
            <button
              className="btn btn-primary"
              onClick={() => requestSend("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => requestSend("intersted", _id)}
            >
              Intersted
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCard;
