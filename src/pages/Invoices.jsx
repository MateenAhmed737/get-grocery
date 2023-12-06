import React, { useEffect, useState } from "react";
import GeneralPage from "./GeneralPage";
import { convertPropsToObject, fetchData, modifyData } from "../utils";
import { base_url } from "../utils/url";
import toast from "react-hot-toast";

const neededProps = [
  "id",
  "_user_id",
  "transaction_id",
  "_package_id",
  "company_name",
  "package_name",
  "package_amount",
  "discount",
  "gst",
  "total",
  "status",
  "payment_method",
];
const template = convertPropsToObject(neededProps);
const showAllInvoices = `${base_url}/invoice`;
const markPaidUrl = `${base_url}/invoice-paid/`;

const Invoices = () => {
  const [data, setData] = useState(null);
  const [, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
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
    title: "Invoices",
    actionCols: ["Mark Paid"],
    template,
    isLoading,
    data,
    setData,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Transaction ID, Name, Amoun...",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    markPaidModalProps: {
      paymentMethods: {
        title: "payment_method",
        arr: ["Stripe"] || paymentMethods,
        getOption: (val) => val,
        required: true,
      },
      gridCols: 1,
      markPaidUrl,
      successCallback: (json) => {
        const updatedData = data.map((item) =>
          item.id === json?.success?.data?.id
            ? modifyData(json?.success?.data, neededProps, true)
            : item
        );

        setData(updatedData);
        setPaginatedData((prev) => ({ ...prev, items: updatedData }));

        toast.success("Successfully marked as Paid!", {
          duration: 2000,
        });
      },
    },
    tableProps: {
      dollarFields: ["package_amount", "total"],
      percentageFields: ["discount", "gst"],
    },
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await fetch(`${base_url}/payment-methods`);
        const json = await res.json();

        if (json.success) {
          const data = json.success.data;
          setPaymentMethods(data);
          console.log("payment methods data ==>", data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData({
      neededProps,
      url: showAllInvoices,
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

export default Invoices;
