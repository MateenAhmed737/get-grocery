import { VscClose } from "react-icons/vsc";

const ViewModal = ({
  viewModal,
  setViewModal,
  excludeFields = [],
  hideFields = [],
  longFields = [],
  linkFields = [],
  imageFields = [],
}) => {
  const data = viewModal.data;
  const keys = Object.keys(data).filter((e) => !excludeFields.includes(e));

  const close = () => setViewModal((prev) => ({ ...prev, isOpen: false }));

  return (
    <>
      <div
        onClick={close}
        className={`${
          viewModal.isOpen ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          viewModal.isOpen ? "" : "hidden"
        } fixed z-20 pointer-events-none flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full pointer-events-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">View</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-3">
                {keys.map((elem) => {
                  if (hideFields.includes(elem)) return null;

                  return (
                    <div
                      key={elem}
                      className={`${
                        longFields.includes(elem)
                          ? "col-span-6"
                          : "col-span-6 sm:col-span-3"
                      } flex flex-col justify-center p-2 border rounded-md bg-gray-50`}
                    >
                      <p
                        className={`block mb-1.5 text-sm font-semibold text-gray-900 capitalize`}
                      >
                        {elem === "id" ? "ID" : elem.replace(/_/g, " ")}
                      </p>
                      <p
                        className={`w-full block font-medium ${
                          elem === "flag_code"
                            ? "font-emoji"
                            : linkFields.includes(elem)
                            ? "truncate text-xs"
                            : "text-xs"
                        } text-gray-700`}
                      >
                        {linkFields.includes(elem) ? (
                          <a
                            className="text-blue-500 hover:underline"
                            href={data[elem]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data[elem]}
                          </a>
                        ) : elem?.toLowerCase().includes("date/time") ? (
                          new Date(data[elem]).toLocaleString()
                        ) : imageFields.includes(elem) ? (
                          <img className="h-10" src={data[elem]} alt={elem} />
                        ) : data[elem] ? (
                          data[elem]
                        ) : (
                          "-"
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
              <button
                onClick={close}
                type="button"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
