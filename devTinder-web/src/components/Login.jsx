import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/contants";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("sharmaji@gmail.com");
  const [password, setPassword] = useState("Sharma@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(result.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };
  return (
    <div className="flex justify-center my-30">
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-2xl">
            Login
          </h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Email ID:</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="Enter Email id"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-lg">Password:</legend>
              <input
                type="text"
                className="input"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <p className="text-rose-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
