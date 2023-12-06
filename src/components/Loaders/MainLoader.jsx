import React from "react";

const MainLoader = ({ extraStyles = "" }) => {
  return (
    <div
      className={`fixed inset-0 bg-white z-40 transition-all duration-300 ${extraStyles}`}
    >
      <div className="justify-center jimu-primary-loading"></div>
    </div>
  );
};

export default MainLoader;
