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
const getProducts = `${base_url}/get_products.php`;

const SlidesManagement = () => {
  const { user } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState(null);
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
            item?.type?.toLowerCase()?.includes(str?.toLowerCase()) ||
            item?.link?.toLowerCase()?.includes(str?.toLowerCase()) ||
            String(item?.product_id)
              ?.toLowerCase()
              ?.includes(str?.toLowerCase())
        ),
      }));
    }
  };

  const modalState = convertPropsToObject([
    "id",
    "product_id",
    "image",
    "type",
  ]);

  const editModalState = {
    id: "",
    product_id: "",
    image: "",
    type: "",
    link: "",
  };

  const createCallback = (res) => {
    // const resData = res?.success?.data;
    // const newState = [resData, ...data];
    // setData(newState);
    // setPaginatedData((prev) => ({ ...prev, items: newState }));

    // console.log("response ===>", resData);
    setReload(!reload);
  };

  const editCallback = (res, state) => {
    // const stateCopy = data?.map((e) =>
    //   e.id === state.id ? { ...e, ...state } : e
    // );

    // setData(stateCopy);
    // setPaginatedData((prev) => ({ ...prev, items: stateCopy }));
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

  const inputFields = [
    {
      key: "type",
      title: "type",
      arr: products,
      getOption: (val) => val?.name?.[0]?.value,
      getValue: (val) => val?.id,
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
      excludeFields: ["created_at", "updated_at"],
      hideFields: ["id", "product_id", "link"],
      inputFields,
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
      excludeFields: ["created_at", "updated_at"],
      hideFields: ["id", "product_id", "link"],
      inputFields,
      uploadFields,
      neededProps,
      editUrl,
      successCallback: editCallback,
      template: editModalState,
      gridCols: 1,
      token: user?.token,
      appendableFields,
    },
    tableProps: {
      linkFields: ["link"],
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(getProducts);
        const json = await res.json();
        console.log("products json =>", json);

        if (json.status) {
          setProducts(json?.data?.products);
        }
      } catch (error) {
        console.error(error);
      }
    };

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
    fetchProducts();
  }, [user, reload]);

  return <GeneralPage {...props} />;
};

export default SlidesManagement;
