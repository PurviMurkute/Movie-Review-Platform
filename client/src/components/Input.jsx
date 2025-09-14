import React, {useState} from "react";
import { EyeOff, Eye } from "lucide-react";

const Input = ({ type, placeholder, value, onChange, passwordInput, showPass, setShowPass }) => {

  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="relative">
    {passwordInput? (<span
        onClick={togglePass}
        className="absolute right-5 md:right-14 mt-5 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {showPass ? (
          <Eye className="w-5 h-4" />
        ) : (
          <EyeOff className="w-5 h-4" />
        )}
      </span>): null}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-[90%] md:w-[85%] bg-gray-200 p-2 my-5 shadow-lg block mx-auto rounded-md focus:outline-none `}
      />
    </div>
  );
};

export default Input;
