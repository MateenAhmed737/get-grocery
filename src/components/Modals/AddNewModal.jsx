import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import Button from "../Buttons/Button";

const AddNewModal = ({ addNewModal, setAddNewModal, addNew }) => {
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log(state);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addNew(state);
      close();
    }, 2000);
  };

  const close = () => {
    setAddNewModal({ ...addNewModal, isOpen: false });
  };

  const styles = {
    modal: {
      base: "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity px-5",
      open: addNewModal.isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none",
    },
    content: "bg-white rounded w-full max-w-sm",
    header: "flex justify-between items-center py-2 px-4 border-b",
    main: {
      base: "p-4 overflow-y-auto max-h-[70vh]",
      grid: `grid grid-cols-1 gap-4`,
    },
    footer: "flex justify-end py-3 px-4 border-t",
    closeButton:
      "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center",
    input:
      "min-h-[37px] w-[300px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500/50 focus:border-blue-600 block p-2.5",
    createButton: `!w-full !rounded ${isLoading ? "!py-1.5" : "!py-2.5"}`,
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className={`${styles.modal.base} ${styles.modal.open}`}
      onClick={handleBackdropClick}
    >
      <form onSubmit={handleSubmit} className={styles.content}>
        <div className={styles.header}>
          <h2 className="text-lg font-semibold">Add New</h2>
          <button onClick={close} className={styles.closeButton}>
            <VscClose />
          </button>
        </div>
        <div
          className={`${styles.main.base} ${styles.main.grid} ${styles.main.gap}`}
        >
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-xs font-medium text-left text-gray-900 capitalize"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={state}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required={true}
              autoFocus={true}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            type="submit"
            title={isLoading ? "Adding" : "Add"}
            // handleClick={() => console.log("click")}
            extraStyles={styles.createButton}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewModal;
