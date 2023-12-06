import React from "react";
import { FaLock } from "react-icons/fa";

const AccessDenied = ({ page = "this page" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <FaLock className="text-6xl text-red-500" />
      <h1 className="mt-2 font-semibold text-gray-700">
        You don't have access to {page}!
      </h1>
    </div>
  );
};

export default AccessDenied;
