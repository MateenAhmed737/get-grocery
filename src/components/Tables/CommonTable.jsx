import React, { useMemo } from "react";
import Actions from "../Actions";
import { Image_BaseUrl_category_images, image_base_url } from "../../utils/url";

const CommonTable = ({
  template,
  state,
  setState,
  actionCols,
  props,
  percentageFields = [],
  excludeFields = [],
  dollarFields = [],
  hideFields = [],
  linkFields = [],
  title,
}) => {
  const keys = Object.keys(template).filter((e) => !excludeFields.includes(e));

  const removeUnderscore = (str) =>
    str.replace(/^.|_./g, (match) => match.toUpperCase()).replace(/_/g, " ");

  const imageBaseUrl = useMemo(() => {
    if (title === "Categories") {
      return Image_BaseUrl_category_images;
    } else {
      return image_base_url;
    }
  }, [props]);

  return (
    <>
      <div className="relative overflow-hidden overflow-x-auto">
        <table className="w-full overflow-hidden text-sm text-left text-black rounded-md bg-gray-50">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              {keys.map(
                (elem) =>
                  elem?.at(0) !== "_" && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-center"
                      key={elem}
                    >
                      {removeUnderscore(elem)}
                    </th>
                  )
              )}
              {actionCols &&
                actionCols.map((elem) => (
                  <th key={elem} scope="col" className="px-6 py-3 text-center">
                    {elem}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {state.length ? (
              state.map((data) => (
                <tr
                  className="border-b bg-gray-50 hover:bg-gray-100"
                  key={data.id}
                >
                  {keys.map((key) => {
                    if (hideFields.includes(key) || key?.at(0) === "_")
                      return "";

                    return key.includes("image") && data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        <img
                          src={imageBaseUrl + data[key]}
                          alt={key}
                          className="object-cover object-center h-10 mx-auto origin-center"
                        />
                      </td>
                    ) : linkFields.includes(key) && data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        <a
                          href={data[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {data[key]}
                        </a>
                      </td>
                    ) : percentageFields.includes(key) && data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        {data[key]}%
                      </td>
                    ) : dollarFields.includes(key) && data[key] ? (
                      <td
                        key={key + data.id}
                        className={`px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal ${
                          key === "credit/debit" &&
                          (data[key]?.[0] === "-"
                            ? "text-red-600"
                            : data[key]?.[0] === "-"
                            ? "text-green-600"
                            : "")
                        }`}
                      >
                        {data[key]?.[0] === "-"
                          ? "-$"
                          : data[key]?.[0] === "+"
                          ? "+$"
                          : "$"}
                        {Number(
                          data[key]?.[0] === "-" || data[key]?.[0] === "+"
                            ? data[key].slice(1)
                            : data[key]
                        ).toFixed(2)}
                      </td>
                    ) : key.includes("date") &&
                      key.includes("time") &&
                      data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        {new Date(data[key]).toLocaleString()}
                      </td>
                    ) : key.includes("date") && data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        {new Date(data[key]).toDateString()}
                      </td>
                    ) : key.includes("time") && data[key] ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        {new Date(data[key]).toTimeString()}
                      </td>
                    ) : data[key] !== null &&
                      data[key] !== undefined &&
                      data[key] !== "" ? (
                      <td
                        key={key + data.id}
                        className="px-6 py-4 text-xs text-center whitespace-nowrap md:whitespace-normal"
                      >
                        {data[key]}
                      </td>
                    ) : (
                      <td
                        className="px-6 py-4 text-xs text-center"
                        key={key + data.id}
                      >
                        -
                      </td>
                    );
                  })}

                  {actionCols && (
                    <Actions
                      {...{
                        data,
                        setData: setState,
                        id: data.id,
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
                  className={`"px-6 py-4 whitespace-nowrap text-xs`}
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

export default CommonTable;
