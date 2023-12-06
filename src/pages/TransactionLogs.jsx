import React, { useEffect, useState } from "react";
import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { convertPropsToObject, fetchData } from "../utils";

const neededProps = [
  "_id",
  "company_id",
  "transaction_id",
  "type",
  "credit/debit",
  "_credit",
  "_debit",
  { from: "amount", to: "balance" },
  "payment_method",
  { from: "created_at", to: "date/time" },
];
const template = convertPropsToObject(neededProps);
const showAllTransactionLogs = `${base_url}/get-transaction`;

const TransactionLogs = () => {
  const [data, setData] = useState(null);
  const [, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });

  const search = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) =>
          Object.keys(template).some(
            (key) =>
              item?.[key] &&
              String(item?.[key])?.toLowerCase()?.includes(value?.toLowerCase())
          )
        ),
      }));
    }
  };

  const props = {
    title: "Transaction Logs",
    actionCols: [],
    template,
    isLoading,
    data,
    setData,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by IDs, Type, Amount, Method...",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    tableProps: {
      dollarFields: ["balance", "credit/debit"],
    },
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllTransactionLogs,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        const newState = data.map((e) => ({
          ...e,
          "credit/debit": e._credit
            ? "+" + e._credit
            : e._debit
            ? "-" + e._debit
            : "",
        }));

        setData(newState);
        setPaginatedData((prev) => ({ ...prev, items: newState }));
      },
    });
  }, []);

  return <GeneralPage {...props} />;
};

export default TransactionLogs;
