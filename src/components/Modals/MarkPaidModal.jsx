import React, { useState } from "react";
import { Button } from "../Buttons";
import toast from "react-hot-toast";
import { VscClose } from "react-icons/vsc";
import { DropdownField } from "../Fields";

const MarkPaidModal = ({
  markPaidModal,
  setMarkPaidModal,
  successCallback,
  markPaidUrl,
  gridCols = 2,
  paymentMethods,
}) => {
  const data = markPaidModal.data;

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    transaction_id: "",
    payment_method: "",
  });

  const keys = Object.keys(state);

  const close = () => setMarkPaidModal((prev) => ({ ...prev, isOpen: false }));

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formdata = new FormData();
      keys.forEach((key) => {
        console.log(key, state[key]);
        formdata.append(key, state[key]);
      });
      formdata.append("status", "Paid");

      const requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(markPaidUrl + data.id, requestOptions);
      const json = await res.json();

      console.log("json", json);

      if (json.success) {
        successCallback && successCallback(json);
        close();
      }
    } catch (error) {
      toast.error("An error occurred!", {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    modal: {
      base: "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity",
      open: markPaidModal.isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none",
      get() {
        return `${this.base} ${this.open}`;
      },
    },
    content: `bg-white rounded-md w-full mx-5 ${
      gridCols === 2 ? "max-w-xl" : "max-w-sm"
    }`,
    header: "flex justify-between items-center py-3 px-4 border-b",
    main: {
      base: "p-4 overflow-y-auto max-h-[70vh]",
      grid: `grid grid-cols-1 sm:grid-cols-${gridCols} gap-4`,
      get() {
        return `${this.base} ${this.grid}`;
      },
    },
    footer: "flex justify-end py-3 px-4 border-t",
    closeButton:
      "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center",
    input:
      "w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500/50 focus:border-blue-600 block p-2.5",
    submitButton: `!w-full !rounded-md ${isLoading ? "!py-2" : "!py-3"}`,
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className={styles.modal.get()} onClick={handleBackdropClick}>
      <form onSubmit={handleSubmit} className={styles.content}>
        <div className={styles.header}>
          <h2 className="text-lg font-semibold">Invoice Payment Details</h2>
          <button type="button" onClick={close} className={styles.closeButton}>
            <VscClose />
          </button>
        </div>
        <div className={styles.main.get()}>
          {keys.map((item) => {
            const title = item.replaceAll("_", " ");

            return (
              <div key={item}>
                <label
                  htmlFor={item}
                  className={`block mb-1 text-xs font-medium capitalize`}
                >
                  {title}
                </label>
                <input
                  type="text"
                  id={item}
                  name={item}
                  value={state[item] || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                  required={true}
                  min={0}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          <Button
            type="submit"
            title={isLoading ? "Submiting" : "Submit"}
            isLoading={isLoading}
            extraStyles={styles.submitButton}
          />
        </div>
      </form>
    </div>
  );
};

export default MarkPaidModal;
