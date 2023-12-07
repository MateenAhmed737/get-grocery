import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { useState, useEffect } from "react";
import { convertPropsToObject, fetchData } from "../utils";

const neededProps = [
  { from: "category_id", to: "id" },
  "category_name",
  { from: "image_url", to: "image" },
];
const template = convertPropsToObject(neededProps);
const showAllCategories = `${base_url}/get_categories.php`;
const createUrl = `${base_url}/create_category.php`;
const editUrl = `${base_url}/edit_category.php`;

const Categories = () => {
  const [, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
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
        items: data.filter(
          (item) =>
            item?.category_name?.toLowerCase()?.includes(str?.toLowerCase()) ||
            String(item?.id)?.toLowerCase()?.includes(str?.toLowerCase())
        ),
      }));
    }
  };

  const editModalTemplate = {
    id: "",
    category_name: "",
    image: "",
  };

  const createModalTemplate = {
    category_name: "",
    image: "",
  };

  const createCallback = (res) => {
    // const resData = modifyData(res?.success?.data, neededProps, true);
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
        formdata.append("category_id", value);
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
    title: "Categories",
    actionCols: ["Details", "Edit"],
    data,
    setData,
    template,
    isLoading,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Category Name and ID",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    createModalProps: {
      createUrl,
      neededProps,
      uploadFields,
      appendableFields,
      excludeFields: ["id", "created_at", "updated_at"],
      hideFields: [],
      initialState: createModalTemplate,
      successCallback: createCallback,
      gridCols: 1,
    },
    editModalProps: {
      editUrl,
      neededProps,
      uploadFields,
      appendableFields,
      excludeFields: ["id", "created_at", "updated_at"],
      successCallback: editCallback,
      template: editModalTemplate,
      gridCols: 1,
    },
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllCategories,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        setData(data);
        setPaginatedData((prev) => ({ ...prev, items: data }));
      },
    });
  }, [reload]);

  return <GeneralPage {...props} />;
};

export default Categories;
