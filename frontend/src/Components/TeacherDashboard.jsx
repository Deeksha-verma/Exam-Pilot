import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TeacherDashboard() {
  let [paper, setpaper] = useState({
    name: "",
    numQuestions: 0,
    scheduledTime: "",
    timeAllotted: 0,
    syllabusImage: null,
  });

  function getFile(e) {
    let name = e.target.name;
    let value = e.target.files[0];
    setpaper((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function postData(e) {
    try {
      e.preventDefault();
      console.log("paper", paper);
      console.log("sending");
      const response = await axios.post(
        "http://localhost:3001/questions/generate-questions/",
        paper,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("got response", response);
    } catch (error) {
      console.error("error in sending backend request", error);
    }
  }

  return (
    <>
      <div className=' bg-[url("./public/assets/dasboardBackground.jpeg")] bg-no-repeat bg-cover w-full h-screen'>
        <nav className="flex w-full h-22 py-4">
          <div className="h-full flex justify-center align-middle m-auto">
            <ul className="flex m-auto gap-11">
              <li className="bg-gray-500 px-2 py-4 rounded-full text-white">
                dashboard
              </li>
              <Link to={"/upcoming-exam"}>
                <li className="bg-gray-500 px-2 py-4 rounded-full text-white">
                  upcoming exams
                </li>
              </Link>
              <li className="bg-gray-500 px-2 py-4 rounded-full text-white">
                Leaderboard
              </li>
              <li className="bg-gray-500 px-2 py-4 rounded-full text-white">
                Logout
              </li>
            </ul>
          </div>
        </nav>

        <div className="mx-16 mt-12 flex">
          <div className="w-33%">
            <div className="flex">
              <img
                className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mx-3">
                <h1>name</h1>
                <p>AMish</p>
              </div>
            </div>
            <div className="my-4">
              <div className="text-lg font-bold">Department</div>
              <div>Computer Science</div>
            </div>
            <div className="my-4">
              <div className="text-lg font-bold">DOB</div>
              <div>12/04/1992</div>
            </div>
            <div className="my-4">
              <div className="text-lg font-bold">Contact</div>
              <div>31412413123</div>
            </div>
            <div className="my-4">
              <div className="text-lg font-bold">Email</div>
              <div>abc@gmail.com</div>
            </div>
          </div>

          <div className="mx-48">
            <div className="text-2xl font-bold mb-14">Details for Exam:</div>
            <form className="mx-9" onSubmit={postData}>
              <div className="my-7 flex">
                <label
                  htmlFor="Name"
                  className="bg-gray-300 py-4 px-8 rounded-full mr-16 w-44 text-center block"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  name="name"
                  className="border-b-2 border-white outline-none bg-transparent mx-44 text-white"
                  id="Name"
                />
              </div>
              <div className="my-7 flex">
                <label
                  htmlFor="numQuestions"
                  className="bg-gray-300 py-4 px-8 rounded-full mr-16 w-44 text-center block"
                >
                  Questions:
                </label>
                <input
                  type="number"
                  name="numQuestions"
                  className="border-b-2 border-white outline-none bg-transparent mx-44 text-white"
                  id="numQuestions"
                />
              </div>
              <div className="my-7 flex">
                <label
                  htmlFor="scheduledTime"
                  className="bg-gray-300 py-4 px-8 rounded-full mr-16 w-44 text-center block"
                >
                  Starting Time:
                </label>
                <input
                  type="datetime-local"
                  name="scheduledTime"
                  className="border-b-2 border-white outline-none bg-transparent mx-44 text-white"
                  id="scheduledTime"
                />
              </div>
              <div className="my-7 flex">
                <label
                  htmlFor="timeAllotted"
                  className="bg-gray-300 py-4 px-8 rounded-full mr-16 w-44 text-center block"
                >
                  Allotted Time:
                </label>
                <input
                  type="number"
                  name="timeAllotted"
                  className="border-b-2 border-white outline-none bg-transparent mx-44 text-white"
                  id="timeAllotted"
                />
              </div>
              <div className="flex gap-40">
                <div className="flex items-center justify-center w-64">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      name="syllabusImage"
                      onChange={getFile}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-gray-300 rounded-full h-16 w-44 text-center"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}