import React from "react";
import ReactCodeInput from "react-code-input";

const ConfirmationCodeFeilds = ({ fields, type, autoFocus, onChange }) => {
  return (
    <div className="flex items-center justify-center mt-3">
      <ReactCodeInput
        {...{
          type,
          fields,
          autoFocus,
          onChange,
          inputStyle: {
            fontSize: 15,
            fontFamily: "Poppins",
            width: 40,
            height: 38,
            border: "1px solid lightgray",
            borderRadius: 10,
            outline: "none",
            textAlign: "right",
            margin: "0 3px 0 3px",
          },
        }}
      />
    </div>
  );
};

export default ConfirmationCodeFeilds;
