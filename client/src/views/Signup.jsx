import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Input";

const Signup = () => {
  const [signupUser, setSignupUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const userSignup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        {
          username: signupUser.username,
          email: signupUser.email,
          password: signupUser.password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setSignupUser({
          username: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <div className="min-h-screen top-0 left-0 fixed w-full flex justify-center items-center">
      <Header />
      <div className="ms-1 md:me-5 bg-gray-200 p-10 rounded-md">
        <form
          className="w-[300px] md:w-[420px] block mx-auto bg-gradient-to-b from-gray-700 via-gray-900 to-black py-5 px-2 shadow-xl my-2 rounded-md relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FaSignInAlt className="text-xl block mx-auto text-white" />
          <h2 className="font-bold text-white pt-1 pb-3 text-2xl text-center">
            Signup
          </h2>
          <Input
            type="text"
            placeholder="UserName"
            value={signupUser.username}
            onChange={(e) => {
              setSignupUser({ ...signupUser, username: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Email"
            value={signupUser.email}
            onChange={(e) => {
              setSignupUser({ ...signupUser, email: e.target.value });
            }}
          />
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={signupUser.password}
            onChange={(e) => {
              setSignupUser({ ...signupUser, password: e.target.value });
            }}
            passwordInput="true"
            showPass={showPass}
            setShowPass={setShowPass}
          />
          <button
            className="bg-gray-100 w-[85%] py-2 text-black rounded-2xl block mx-auto my-6 cursor-pointer"
            onClick={userSignup}
          >
            Signup
          </button>
        </form>
        <p className="text-slate-800 text-center font-medium py-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">
            Login now.
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
