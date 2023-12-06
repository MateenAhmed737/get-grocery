import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { useState, useEffect } from "react";
import { convertPropsToObject, fetchData, modifyData } from "../utils";

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
  "package",
  "_package_name",
  "_package_id",
  "_package_amount",
  "_discount",
  "_gst",
  "_total",
];
const template = convertPropsToObject(neededProps);
const showAllCompanies = `${base_url}/get-company`;
const createUrl = `${base_url}/create-company`;
const editUrl = `${base_url}/edit-company`;
const blockUrl = `${base_url}/suspend-company`;
const deleteUrl = (data) => {
  const formdata = new FormData();
  formdata.append("type", "Company");
  const url = `${base_url}/delete-api/${data?.id}`;
  const requestOptions = {
    headers: {
      accept: "application/json",
    },
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  return [url, requestOptions];
};

const Companies = () => {
  const [, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [packages, setPackages] = useState([]);
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

  const editModalTemplate = {
    id: "",
    person_name: "",
    company_tax_id: "",
    company_name: "",
    company_email: "",
    _password: "",
    _city: "",
    _zip_code: "",
    _package_id: "",
    _company_address: "",
    status: "",
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
    _package_name: "",
    _package_id: "",
    _package_amount: "",
    _discount: "0",
    _gst: "0",
    status: "",
    _total: "",
  };

  const createCallback = (res) => {
    const resData = modifyData(res?.success?.data, neededProps, true);
    const newState = [resData, ...data];
    setData(newState);
    setPaginatedData((prev) => ({ ...prev, items: newState }));

    console.log("response ===>", resData);
  };

  const editCallback = (res, state) => {
    const resData = modifyData(res?.success?.data, neededProps, true);
    const selectedPackage = packages.find((e) => e.id == state._package_id);
    resData._package_id = selectedPackage.id;
    resData.package = selectedPackage.name;

    const stateCopy = [...data].map((e) => (e.id === resData.id ? resData : e));

    setData(stateCopy);
    setPaginatedData((prev) => ({ ...prev, items: stateCopy }));
    console.log("response ===>", resData);
  };

  const dropdownFields = [
    {
      key: "_package_id",
      title: "package",
      arr: packages,
      getOption: (val) => val?.name,
      getValue: (val) => val?.id,
      onChange: (key, value, setState) => {
        const package_data = packages.find((e) => e.id == value);

        console.log("package_data", package_data);

        setState((prev) => {
          const gst = Number(prev.gst || 0);
          const price = Number(package_data?.price || 0);
          const discount = Number(prev.discount || 0);
          const discountedPrice = discount
            ? price - (price / 100) * discount
            : price;
          let total = gst
            ? discountedPrice + (discountedPrice / 100) * gst
            : discountedPrice;
          total = total || "0";
          console.log("==>", gst, price, discount, total);

          return {
            ...prev,
            [key]: value,
            _package_name: package_data?.name,
            _package_amount: package_data?.price,
            _total: total,
          };
        });
      },
    },
    {
      key: "status",
      title: "status",
      arr: ["Active", "InActive"],
      getOption: (val) => val,
    },
  ];

  const props = {
    title: "Companies",
    actionCols: ["View", "Edit", "Delete", "Block/Unblock"],
    data,
    setData,
    blockUrl,
    deleteUrl,
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
      disabledFields: ["total"],
      textAreaFields: ["_company_address"],
      excludeFields: ["id", "created_at", "updated_at"],
      hideFields: ["_package_name", "_package_amount"],
      dropdownFields,
      neededProps,
      createUrl,
      initialState: createModalTemplate,
      successCallback: createCallback,
    },
    editModalProps: {
      disabledFields: ["total"],
      textAreaFields: ["_company_address"],
      excludeFields: ["id", "created_at", "updated_at", "status", "_password"],
      dropdownFields: [
        {
          key: "_package_id",
          title: "package",
          arr: packages,
          getOption: (val) => val?.name,
          getValue: (val) => val?.id,
          // defaultValue: (state) => state?.package?.id,
        },
      ],
      neededProps,
      editUrl,
      successCallback: editCallback,
      template: editModalTemplate,
    },
    viewModalProps: {
      excludeFields: [
        "created_at",
        "updated_at",
        "_password",
        "_package_amount",
        "_package_id",
        "_package_name",
        "_total",
        "_gst",
        "_discount",
        "role",
      ],
      longFields: ["_company_address"],
    },
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const requestOptions = {
          headers: {
            accept: "application/json",
          },
          method: "GET",
          redirect: "follow",
        };

        const res = await fetch(`${base_url}/get-package`, requestOptions);
        const json = await res.json();

        if (json.success) {
          const data = json.success.data;
          setPackages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData({
      neededProps,
      url: showAllCompanies,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        const updatedData = data?.map((e) => ({
          ...e,
          package: e.package?.package_name,
          _package_id: e.package?.package_id,
        }));

        setData(updatedData);
        setPaginatedData((prev) => ({ ...prev, items: updatedData }));
      },
    });

    fetchPackages();
  }, []);

  return <GeneralPage {...props} />;
};

export default Companies;
