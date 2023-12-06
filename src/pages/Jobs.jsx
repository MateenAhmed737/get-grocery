import React from "react";
import GeneralPage from "./GeneralPage";
import { useEffect } from "react";
import { useState } from "react";
import { convertPropsToObject, fetchData, modifyData } from "../utils";
import { base_url } from "../utils/url";
import { useContext } from "react";
import { AppContext } from "../context";

const neededProps = [
  "id",
  "person_name",
  "company_tax_id",
  "company_name",
  "company_email",
  "_password",
  "_city",
  "_company_address",
  "_zip_code",
  "status",
];
const template = convertPropsToObject(neededProps);
const showAllJobs = `${base_url}/show-company-lead/`;
const createUrl = `${base_url}/store-company-lead`;

const Jobs = () => {
  const { user } = useContext(AppContext);
  const [, setSearchText] = useState("");
  const [data, setData] = useState(null);
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
          Object.keys(template).some((key) =>
            String(item?.[key])?.toLowerCase()?.includes(str?.toLowerCase())
          )
        ),
      }));
    }
  };

  const createModalTemplate = {
    id: "",
    person_name: "",
    company_tax_id: "",
    company_name: "",
    company_email: "",
    _password: "",
    _city: "",
    _company_address: "",
    _zip_code: "",
    status: "",
  };

  const createCallback = (res) => {
    const resData = modifyData(res?.success?.data, neededProps);
    const newState = [resData, ...data];
    setData(newState);
    setPaginatedData((prev) => ({ ...prev, items: newState }));

    console.log("response ===>", resData);
  };

  const dropdownFields = [
    {
      key: "status",
      title: "status",
      arr: ["Active", "InActive"],
      getOption: (val) => val,
    },
  ];

  const props = {
    title: "Companies",
    actionCols: ["View"],
    data,
    setData,
    template,
    isLoading,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Name, Email, Phone, Address...",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    createModalProps: {
      textAreaFields: ["_company_address"],
      excludeFields: ["id", "created_at", "updated_at"],
      dropdownFields,
      neededProps,
      createUrl,
      initialState: createModalTemplate,
      successCallback: createCallback,
    },
    viewModalProps: {
      excludeFields: ["created_at", "updated_at", "_password"],
      longFields: ["_company_address"],
    },
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllJobs + user?.id,
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

export default Jobs;
