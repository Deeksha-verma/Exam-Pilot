import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    type: "",
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
      console.log(user);
      const response = await axios.post("http://localhost:3001/signup", user);
      if (response.status === 200) {
        alert('Registration Successful!');
        localStorage.setItem("token",response.data.token);
        navigate("/teacher-dashboard");
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error("There was an error during signup:", error);
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
          <h1 className="text-3xl font-bold mt-4">Sign-Up</h1>
          <form className="px-6" onSubmit={setData}>
            <div className="flex flex-col mt-4">
              <label htmlFor="name" className="font-semibold text-lg">
                Name
              </label>
              <input
                required
                type="text"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="name"
                placeholder="Your name"
                onChange={getdata}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="username" className="font-semibold text-lg">
                User Name
              </label>
              <input
                required
                type="text"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="username"
                placeholder="Your user name"
                onChange={getdata}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="email" className="font-semibold text-lg">
                Email
              </label>
              <input
                required
                type="email"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="email"
                placeholder="Your email id"
                onChange={getdata}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="contact" className="font-semibold text-lg">
                Contact No.
              </label>
              <input
                required
                type="text"
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="contact"
                placeholder="Your contact"
                onChange={getdata}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="type" className="font-semibold text-lg">
                You are a?
              </label>
              <select
                required
                className="border-b-2 outline-none px-2 my-2 focus:border-gray-500"
                name="type"
                onChange={getdata}
              >
                <option value="" disabled selected>
                  Select your role
                </option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
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
            </div>

            <button className="text-white font-bold bg-cyan-800 w-[100%] mt-6 py-3 rounded-full">
              SignUp
            </button>

            <div className="mt-3">
              <h1 className="text-center text-sm">
                Already have an account{" "}
                <Link to={"/login"} className="underline">
                  Login
                </Link>
              </h1>
            </div>
            <div className="mt-6 relative">
              <div className="absolute top-3 w-full border-[1px] border-gray-600"></div>
              <div className="flex justify-center z-10 relative">
                <h1 className="bg-white w-fit px-3">Or sign-up with</h1>
              </div>
            </div>
          </form>
          <div className="flex justify-center gap-5 my-11">
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
