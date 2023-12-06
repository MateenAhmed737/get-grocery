import React from "react";
import HorizontalTable from "./Tables/HorizontalTable";

const Footer = ({ firstColData, secondColData, title }) => {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center px-2.5 py-6">
      <div>
        <TextData data={firstColData} />
      </div>

      {secondColData.type === "text" ? (
        <TextData data={secondColData.data} />
      ) : secondColData.type === "table" ? (
        <HorizontalTable state={secondColData.data} title={title} />
      ) : (
        ""
      )}
    </footer>
  );
};

const TextData = ({ data }) => {
  return Object.entries(data).map(([key, val]) => {
    const str = `${key.replace(/_/g, " ")}=   ${val}`;
    return (
      <p className="p-2 text-sm font-medium text-white capitalize">{str}</p>
    );
  });
};

export default Footer;
