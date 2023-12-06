import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { useState, useEffect } from "react";
import { convertPropsToObject, fetchData } from "../utils";
import { useContext } from "react";
import { AppContext } from "../context";

const neededProps = [
  { from: "slider_id", to: "id" },
  "product_id",
  { from: "image_url", to: "image" },
  "type",
  "link",
  // "created_at",
];
const template = convertPropsToObject(neededProps);
const showAllSlides = `${base_url}/fetch_slider.php`;
const createUrl = `${base_url}/generate_slider.php`;
const editUrl = `${base_url}/edit_slider.php`;

const dropdownFields = [
  {
    key: "status",
    title: "status",
    arr: ["Active", "InActive"],
    getOption: (val) => val,
  },
];

const SlidesManagement = () => {
  const { user } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
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
              item?.type?.toLowerCase()?.includes(str?.toLowerCase()) ||
              item?.link?.toLowerCase()?.includes(str?.toLowerCase()) ||
              String(item?.product_id)
                ?.toLowerCase()
                ?.includes(str?.toLowerCase())
          )
        ),
      }));
    }
  };

  const modalState = convertPropsToObject([
    "id",
    "product_id",
    "image",
    "type",
    "link",
  ]);

  const createCallback = (res) => {
    // const resData = res?.success?.data;
    // const newState = [resData, ...data];
    // setData(newState);
    // setPaginatedData((prev) => ({ ...prev, items: newState }));

    // console.log("response ===>", resData);
    setReload(!reload);
  };

  const editCallback = (res, state) => {
    const stateCopy = data?.map((e) =>
      e.id === state.id ? { ...e, ...state } : e
    );

    setData(stateCopy);
    setPaginatedData((prev) => ({ ...prev, items: stateCopy }));
  };

  const uploadFields = [
    {
      key: "image",
      title: "image",
    },
  ];

  const appendableFields = [
    {
      key: "id",
      appendFunc: (key, value, formdata) => {
        formdata.append("slider_id", value);
      },
    },
    {
      key: "image_url",
      appendFunc: (key, value, formdata) => {
        formdata.append("fileToUpload", value);
      },
    },
  ];

  const props = {
    title: "Slides Management",
    actionCols: ["Edit"],
    data,
    setData,
    template,
    isLoading,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Product ID, Type and Link",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    createModalProps: {
      excludeFields: ["created_at", "updated_at", "product_id"],
      hideFields: ["id"],
      dropdownFields,
      neededProps,
      uploadFields,
      createUrl,
      initialState: modalState,
      successCallback: createCallback,
      gridCols: 1,
      token: user?.token,
      appendableFields,
    },
    editModalProps: {
      excludeFields: ["created_at", "updated_at", "product_id"],
      hideFields: ["id"],
      dropdownFields,
      uploadFields,
      neededProps,
      editUrl,
      successCallback: editCallback,
      template: modalState,
      gridCols: 1,
      token: user?.token,
      appendableFields,
    },
    tableProps: {
      dollarFields: ["price"],
    },
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("token", user?.token);
    const requestOptions = {
      headers: {
        accept: "application/json",
      },
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetchData({
      neededProps,
      url: showAllSlides,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        setData(data);
        setPaginatedData((prev) => ({ ...prev, items: data }));
      },
      requestOptions,
    });
  }, [user, reload]);

  return <GeneralPage {...props} />;
};

export default SlidesManagement;
