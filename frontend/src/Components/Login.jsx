import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    username: "",
    password: "",
  });

  function getdata(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function setData(e) {
    e.preventDefault();
    try {
      const response = await axios.post(api + "login", user);
      if (response.status === 200) {
        alert("Login Succesful!");
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        if (decodedToken.user.type === "Teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        console.error("Error in Logging in:", error);
        if (error.response) {
          alert(
            "Error from server: " +
              error.response.status +
              " - " +
              error.response.data.message
          );
        } else if (error.request) {
          alert("No response from the server");
        } else {
          alert("Error setting up the request: " + error.message);
        }
      }
    } catch (error) {
      console.error("There was an error during login:", error);
    }
  }

  return (
    <>
      <div className="w-full h-screen py-4">
        <div className="m-auto md:w-[32rem] w-full rounded-md shadow-md">
          <div className="w-full">
            <img
              src="./assets/form-hero.jpg"
              className="h-[16rem] w-full rounded-md"
              alt=""
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">LOG-IN</h1>
          <form className="px-6" onSubmit={setData}>
            <div className="flex flex-col mt-4">
              <label htmlFor="username" className="font-semibold text-lg">
                Username
              </label>
              <input
                required
                type="text"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="username"
                placeholder="Your Username"
                onChange={getdata}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="password" className="font-semibold text-lg">
                Password
              </label>
              <input
                required
                type="password"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="password"
                placeholder="password"
                onChange={getdata}
              />
              <h1 className="text-right text-sm">Forget Password?</h1>
            </div>
            <button className="text-white font-bold bg-cyan-800 w-[100%] mt-6 py-3 rounded-full">
              Login
            </button>

            <div className="mt-3">
              <h1 className="text-center text-sm">
                Don't have an account{" "}
                <Link to={"/signup"} className="underline">
                  Sign-up
                </Link>
              </h1>
            </div>
            <div className="mt-6 relative">
              <div className="absolute top-3 w-full border-[1px] border-gray-600"></div>
              <div className="flex justify-center z-10 relative">
                <h1 className="bg-white w-fit px-3">Or login with</h1>
              </div>
            </div>
          </form>
          <div className="flex justify-center gap-5 my-6">
            <button className="p-4 shadow-lg rounded-full">
              <img src="./assets/gmail_logo.png" className="w-6" alt="" />
            </button>
            <button className="p-4 shadow-lg rounded-full">
              <img src="./assets/facebook_logo.png" className="w-6" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
