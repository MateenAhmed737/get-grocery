import React from "react";
import Loader from "../Loaders/Loader";

const Button = ({ title, handleClick, type, extraStyles = "", isLoading }) => {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center px-6 py-2 text-xs font-medium text-center text-white rounded-md bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500/50 disabled:opacity-70 disabled:py-0 disabled:hover:bg-green-500 disabled:saturate-30 disabled:cursor-not-allowed ${extraStyles}`}
      type={type}
      disabled={isLoading}
    >
      {isLoading && <Loader extraStyles={"w-6 h-6 !bg-transparent !static"} />}
      {title}
    </button>
  );
};

export default Button;
