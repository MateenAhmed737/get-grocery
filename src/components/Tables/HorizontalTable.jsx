import React from "react";
import Actions from "../Actions";

const HorizontalTable = ({
  template,
  state,
  setState,
  actionCols,
  props,
  title,
}) => {
  const keys = Object.keys(template || state[0] || state);

  return (
    <>
      <div className="relative overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <tbody className="text-sm text-gray-700 bg-gray-100">
            {title && (
              <tr>
                <th
                  className="px-6 py-2 text-center text-[#294E19] border border-black"
                  colSpan={2}
                >
                  {title}
                </th>
              </tr>
            )}
            {keys.length ? (
              keys.map((key, index) => (
                <tr key={key + index}>
                  <th
                    scope="col"
                    className="px-6 py-1 text-center uppercase  text-[#294E19] border border-black"
                    key={key}
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                  <td
                    className={`px-6 py-1 text-sm text-center bg-gray-100 border border-black whitespace-nowrap`}
                    key={key + state?.id}
                  >
                    {state[key] !== null || state[key] !== undefined
                      ? state[key]
                      : ""}
                  </td>
                  {actionCols && (
                    <Actions
                      {...{
                        state,
                        setData: setState,
                        id: state?.id,
                        actionCols,
                        ...props,
                      }}
                    />
                  )}
                </tr>
              ))
            ) : (
              <tr className="text-center border-b bg-gray-50 hover:bg-gray-100">
                <td
                  className={`"px-6 py-4 whitespace-nowrap border border-black text-sm`}
                  colSpan={keys.length + (actionCols?.length + 1 || 0)}
                >
                  No data found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HorizontalTable;
