import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleEdit = async () => {
    // handle error before edit
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, photoUrl, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  const handleSelect = (value) => {
    setGender(value); // update state
  };
  return (
    <div className="flex justify-center gap-10">
      <div className="flex justify-center my-30">
        <div className="card card-dash bg-base-300 w-96 ">
          <div className="card-body">
            <h2 className="card-title justify-center font-bold text-2xl">
              Edit Profile
            </h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">First Name:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="Enter First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Last Name:</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  placeholder="Enter Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Photo URL:</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  placeholder="Enter Photo URL"
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Age:</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  placeholder="Enter Age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Gender:</legend>
                <div className="dropdown dropdown-bottom dropdown-end">
                  {/* Dropdown button */}
                  <div tabIndex={0} role="button" className="btn m-1">
                    {gender ? gender : "Select Gender ⬇️"}
                  </div>

                  {/* Dropdown options */}
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a onClick={() => handleSelect("male")}>Male</a>
                    </li>
                    <li>
                      <a onClick={() => handleSelect("female")}>Female</a>
                    </li>
                    <li>
                      <a onClick={() => handleSelect("other")}>Other</a>
                    </li>
                  </ul>
                </div>
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">About:</legend>

                <textarea
                  className="textarea"
                  placeholder="Enter About"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                ></textarea>
              </fieldset>
            </div>
            <p className="text-red-600">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleEdit}>
                Save Profile
              </button>
              {showToast && (
                <div className="toast toast-top toast-center">
                  <div className="alert alert-success">
                    <span>Profile Saved Successfully.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-30">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
