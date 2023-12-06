import React, { useEffect, useState } from "react";
import { Button, Page } from "../../components";
import { base_url } from "../../utils/url";
import { toast } from "react-hot-toast";

const getUrl = `${base_url}/setting`;
const editUrl = `${base_url}/edit-setting`;

const AdminOptions = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ Discount: null, GST: null });

  const updateData = async (type) => {
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("type", type);
      formdata.append("message", state[type]);

      const requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(editUrl, requestOptions);
      const json = await res.json();

      console.log(type, " json =>", json);

      if (json.success) {
        setLoading(false);
        toast.success(`${type} updated!`);
      } else {
        setLoading(false);
        toast.error(`Failed to updated ${type}!`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to updated ${type}!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData("Discount");
    updateData("GST");
  };

  const fetchData = async (type) => {
    try {
      const formdata = new FormData();
      formdata.append("type", type);
      const requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const res = await fetch(getUrl, requestOptions);
      const json = await res.json();
      console.log("json", json);

      if (json.success) {
        setState((prev) => ({ ...prev, [type]: json.success.data.message }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData("Discount");
    fetchData("GST");
  }, []);

  return (
    <Page title="Admin Options" enableHeader>
      <main className="p-6 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-3"
        >
          <FormField
            type="number"
            title="Discount"
            state={state.Discount}
            setState={(val) => setState((prev) => ({ ...prev, Discount: val }))}
            readOnly={state.Discount === null}
          />
          <FormField
            title="GST"
            type="number"
            state={state.GST}
            setState={(val) => setState((prev) => ({ ...prev, GST: val }))}
            readOnly={state.GST === null}
          />

          <Button
            type="submit"
            isLoading={loading}
            title={loading ? "Updating" : "Update"}
            extraStyles={loading ? "!py-2.5" : "!py-3"}
          />
        </form>
      </main>
    </Page>
  );
};

const FormField = ({
  type = "text",
  title,
  id,
  placeholder,
  state,
  setState,
  readOnly = false,
}) => {
  return (
    <div>
      <label
        htmlFor={title + id}
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {title}
      </label>
      <input
        type={type}
        name={title + id}
        id={title + id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        placeholder={placeholder}
        required={true}
        readOnly={readOnly}
      />
    </div>
  );
};

export default AdminOptions;
