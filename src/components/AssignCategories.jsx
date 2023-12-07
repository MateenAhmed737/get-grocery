import { useContext, useEffect, useState } from "react";
import { convertPropsToObject, fetchData } from "../utils";
import { base_url } from "../utils/url";
import { AppContext } from "../context";
import { CommonTable } from "./Tables";
import { Loader } from "./Loaders";
import Pagination from "./Pagination";
import { BiSearch } from "react-icons/bi";
import { Button } from "./Buttons";
import { CreateModal } from "./Modals";

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

const AssignCategories = ({ category_id }) => {
  const { user } = useContext(AppContext);
  const [, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });
  const [createModal, setCreateModal] = useState({
    isOpen: false,
    data: template,
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
    title: "Assign Categories",
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

  const styles = {
    main: `relative ${
      isLoading ? "flex justify-center items-center h-[70vh]" : ""
    }`,
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2 space-x-2">
        {/* Search bar start */}
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative !ml-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiSearch />
          </div>
          <input
            id="table-search"
            className="block w-full p-2 pl-10 text-xs text-gray-900 border border-gray-400 rounded-lg md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            {...search}
          />
        </div>
        {/* Search bar end */}

        <Button
          title="Create"
          handleClick={setCreateModal((prev) => ({ ...prev, isOpen: true }))}
        />
      </div>

      <p className="mt-3 mb-2 text-xs">{paginatedData.items.length} results</p>

      <Pagination {...{ paginatedData, setPaginatedData }} />

      <div className={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <CommonTable
            {...{
              title: "Assign Categories",
              template,
              state: paginatedData.curItems,
              setState: setData,
              props: {
                deleteUrl,
                setPaginatedData,
              },
              ...props,
            }}
          />
        )}

        {/* Modals */}
        {createModal.isOpen && (
          <CreateModal
            {...{
              createModal,
              setCreateModal,
              ...props.createModalProps,
              page: "Assign Categories",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AssignCategories;
