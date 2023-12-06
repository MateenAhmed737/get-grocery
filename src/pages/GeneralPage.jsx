import React, { useState } from "react";
import {
  Button,
  CommonTable,
  CreateModal,
  EditModal,
  Loader,
  MarkPaidModal,
  Page,
  Pagination,
  ViewModal,
} from "../components";
import { BiSearch } from "react-icons/bi";

const GeneralPage = ({
  title,
  actionCols = ["Edit", "Block/Unblock", "Delete"],
  template,
  data,
  pagination,
  setData,
  isLoading,
  markPaidModalProps = {},
  createModalProps = {},
  editModalProps = {},
  viewModalProps = {},
  tableProps = {},
  blockUrl,
  deleteUrl,
  search,
}) => {
  const [editModal, setEditModal] = useState({ isOpen: false, data: null });
  const [createModal, setCreateModal] = useState({
    isOpen: false,
    data: template,
  });
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    data: null,
  });
  const [markPaidModal, setMarkPaidModal] = useState({
    isOpen: false,
    data: null,
  });

  const handleClick = () => setCreateModal({ ...createModal, isOpen: true });

  const styles = {
    main: `relative ${
      isLoading ? "flex justify-center items-center h-[70vh]" : ""
    }`,
  };

  return (
    <Page title={title} enableHeader>
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

        {createModalProps.initialState && (
          <Button title="Create" handleClick={handleClick} />
        )}
      </div>

      <p className="mt-3 mb-2 text-xs">{pagination.curLength} results</p>

      <Pagination {...pagination} />

      <main className={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <CommonTable
            {...{
              template,
              state: pagination?.paginatedData?.curItems,
              setState: setData,
              actionCols,
              props: {
                setViewModal,
                setEditModal,
                setMarkPaidModal,
                blockUrl,
                deleteUrl,
                setPaginatedData: pagination?.setPaginatedData,
              },
              ...tableProps,
            }}
          />
        )}

        {/* Modals */}
        {createModal.isOpen && (
          <CreateModal
            {...{ createModal, setCreateModal, ...createModalProps }}
          />
        )}
        {editModal.isOpen && (
          <EditModal {...{ editModal, setEditModal, ...editModalProps }} />
        )}
        {viewModal.isOpen && (
          <ViewModal {...{ viewModal, setViewModal, ...viewModalProps }} />
        )}
        {markPaidModal.isOpen && (
          <MarkPaidModal
            {...{ markPaidModal, setMarkPaidModal, ...markPaidModalProps }}
          />
        )}
      </main>
    </Page>
  );
};

export default GeneralPage;
