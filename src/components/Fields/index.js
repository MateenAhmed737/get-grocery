import React from "react";

export const TextArea = (props) => {
  const { keyName, title = keyName, state, setState, required } = props;
  const name = title.replace(/_/g, " ").toLowerCase();

  return (
    <div className={"col-span-2"}>
      <label
        htmlFor={name}
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {name}
      </label>
      <textarea
        rows={8}
        name={name}
        id={name}
        value={state}
        onChange={(e) =>
          setState((prev) => ({ ...prev, [keyName]: e.target.value }))
        }
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        placeholder={"Write " + name + " here..."}
        required={required}
      />
    </div>
  );
};

export const DropdownField = ({
  keyName,
  title = keyName,
  state,
  setState,
  arr,
  getOption,
  getValue,
  onChange,
  required = false,
  defaultValue,
}) => {
  const name = title.replace(/_/g, " ").toLowerCase();

  const handleChange = onChange
    ? (e) => onChange(keyName, e.target.value, setState)
    : (e) => {
        const value = e.target.value;

        setState((prev) => ({ ...prev, [keyName]: value }));
      };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-1 text-xs font-medium text-gray-900 capitalize"
      >
        {name}
      </label>
      <select
        required={required}
        value={state}
        onChange={handleChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id={name}
        name={keyName}
      >
        <option className="text-sm" value="" defaultValue={defaultValue}>
          select {name}
        </option>
        {arr.map((item, indx) => {
          const option = getOption(item);
          return (
            <option
              className="text-sm"
              key={option + indx}
              value={getValue ? getValue(item) : option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const UploadField = ({
  keyName,
  title = keyName,
  accept = "image/*",
  canUploadAnything = false,
  canUploadMultiple = false,
  required = false,
  setState,
}) => {
  const handleChange = (e) => {
    const media = canUploadMultiple ? e.target.files : e.target.files[0];
    setState((prev) => ({ ...prev, [keyName]: media }));
  };

  return (
    <div>
      <label
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
        htmlFor={title}
      >
        {title.replaceAll("_", " ")}
      </label>
      <input
        className="block w-full text-[10px] text-gray-900 border border-gray-300 p-2 py-2 rounded-lg cursor-pointer bg-gray-50"
        id={title}
        type="file"
        onChange={handleChange}
        multiple={canUploadMultiple}
        accept={canUploadAnything ? "*" : accept}
        required={required}
      />
    </div>
  );
};
