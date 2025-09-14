import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Input";
import { UserContext } from "../context/userContext";
import Footer from "../components/Footer";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const userLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        {
          email: loginUser.email,
          password: loginUser.password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.data);
        localStorage.setItem("currentuser", JSON.stringify(response.data.data));

        localStorage.setItem("JwtToken", response.data.jwtToken);

        setLoginUser({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <>
    <div className="min-h-screen top-0 left-0 fixed w-full flex justify-center items-center">
      <Header />
        <div className="ms-1 md:me-5 bg-gradient-to-b from-red-600 via-orange-500 to-red-500 px-5 py-10 rounded-md">
          <form
            className="w-[300px] md:w-[420px] block mx-auto py-5 px-2 my-2 rounded-md relative"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FaSignInAlt className="text-xl block mx-auto text-white" />
            <h2 className="font-bold text-white pt-1 pb-3 text-2xl text-center">
              login
            </h2>
            <Input
              type="text"
              placeholder="Email"
              value={loginUser.email}
              onChange={(e) => {
                setLoginUser({ ...loginUser, email: e.target.value });
              }}
            />
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={loginUser.password}
              onChange={(e) => {
                setLoginUser({ ...loginUser, password: e.target.value });
              }}
              passwordInput="true"
              showPass={showPass}
              setShowPass={setShowPass}
            />
            <button className="bg-white w-[85%] py-2 text-black rounded-2xl block mx-auto my-6 cursor-pointer" onClick={userLogin}>Login</button>
          </form>
          <p className="text-white text-center font-medium py-2">
            Dont have an account?{" "}
            <Link to="/signup" className="text-blue-400">
              SignUp now.
            </Link>
          </p>
        </div>
      <Toaster />
    </div>
    </>
  );
};

export default Login;

