import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { useState, useEffect, useContext } from "react";
import { convertPropsToObject, fetchData } from "../utils";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import AssignCategories from "../components/AssignCategories";

const neededProps = [
  { from: "banner_id", to: "id" },
  "category_id",
  "category_name",
  { from: "image_url", to: "image" },
  // "status",
];
const template = convertPropsToObject(neededProps);
const showAllCategory = `${base_url}/get_category_banners.php`;
const createUrl = `${base_url}/create_category_banner.php`;

const Category = () => {
  const { user } = useContext(AppContext);
  const { id: category_id } = useParams();
  const [, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });

  const deleteUrl = (data) => {
    const formdata = new FormData();
    formdata.append("token", user?.token);
    formdata.append("category_banner_id", data.id);
    const requestOptions = {
      headers: {
        accept: "application/json",
      },
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    return [`${base_url}/delete_category_banner.php`, requestOptions];
  };

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
            String(item?.id)?.toLowerCase()?.includes(str?.toLowerCase()) ||
            String(item?.category_id)
              ?.toLowerCase()
              ?.includes(str?.toLowerCase())
        ),
      }));
    }
  };

  const createModalTemplate = {
    image: "",
  };

  const createCallback = (res) => {
    setReload(!reload);
  };

  const uploadFields = [
    {
      key: "image",
      title: "image",
    },
  ];

  const appendableFields = [
    {
      key: "image_url",
      appendFunc: (key, value, formdata) => {
        formdata.append("category_id", category_id);
        formdata.append("fileToUpload", value);
      },
    },
  ];

  const props = {
    title: "Category Banners",
    actionCols: ["Delete"],
    data,
    setData,
    template,
    isLoading,
    deleteUrl,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Category Name and IDs",
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
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllCategory,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        setData(data);
        setPaginatedData((prev) => ({ ...prev, items: data }));
      },
    });
  }, [reload]);

  return (
    <div className="flex flex-col">
      <GeneralPage {...props} />
      <AssignCategories />
    </div>
  );
};

export default Category;
