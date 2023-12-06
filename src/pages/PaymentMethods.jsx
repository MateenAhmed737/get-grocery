import React, { useEffect, useState } from "react";
import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { convertPropsToObject, fetchData } from "../utils";

const neededProps = ["id", "name", "status"];
const template = convertPropsToObject(neededProps);
const showAllPaymentMethods = `${base_url}/payment-methods`;

const PaymentMethods = () => {
  const [data, setData] = useState(null);
  const [, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });

  const search = (e) => {
    const str = e.target.value;
    setSearchText(str.trim());

    if (str.trim() === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) =>
          Object.keys(template).some(
            (key) =>
              item?.[key] &&
              String(item?.[key])?.toLowerCase()?.includes(str?.toLowerCase())
          )
        ),
      }));
    }
  };

  const props = {
    title: "Payment Methods",
    actionCols: ["Remove"],
    template,
    isLoading,
    data,
    setData,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Name",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllPaymentMethods,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        setData(data);
        setPaginatedData((prev) => ({ ...prev, items: data }));
      },
    });
  }, []);

  return <GeneralPage {...props} />;
};

export default PaymentMethods;
