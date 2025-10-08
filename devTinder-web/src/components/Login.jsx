import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/contants";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
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
  const handleSignUP = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };
  return (
    <div className="flex justify-center my-30">
      <div className="card card-dash bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-2xl">
            {signUp ? "Sign Up" : "Login"}
          </h2>
          {signUp && (
            <div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-lg">
                    First Name:
                  </legend>
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
                  <legend className="fieldset-legend text-lg">
                    Last Name:
                  </legend>
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
            </div>
          )}
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
                type="password"
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
            <button
              className="btn btn-primary"
              onClick={signUp ? handleSignUP : handleLogin}
            >
              {signUp ? "Sign Up" : "Login"}
            </button>
          </div>
          <p
            className="justify-center my-3 cursor-pointer"
            onClick={() => setSignUp((value) => !value)}
          >
            {signUp ? "Existing User ? Login In" : "New User ? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
