import React, { useEffect, useState } from "react";
import Account from "./Account";

const Page = ({
  title,
  containerStyles = "",
  headerStyles = "",
  children,
  enableHeader,
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.title = title + " - Get Gorcery";

    return () => {
      document.title = "Get Gorcery";
    };
  }, [title]);

  // useEffect(() => {
  //   const mouseDownHandler = (e) => {
  //     const accountMenu = document.getElementById("account-menu");
  //     console.log("accountMenu", accountMenu);
  //     if (accountMenu.contains(e.target)) {
  //       setToggle(false);
  //     }
  //   };

  //   document.addEventListener("click", mouseDownHandler);

  //   return () => {
  //     document.removeEventListener("click", mouseDownHandler);
  //   };
  // }, []);

  const styles = {
    header:
      "flex justify-between items-center w-full my-2 mb-6 " + headerStyles,
    heading: "text-xl font-semibold",
  };

  return (
    <div
      className={`font-poppins bg-white w-full h-full p-3 pl-4 ${containerStyles}`}
    >
      {enableHeader && (
        <header className={styles.header}>
          <h1 className={styles.heading}>{title}</h1>
          <Account toggle={toggle} setToggle={setToggle} />
        </header>
      )}
      {children}
    </div>
  );
};

export default Page;
