import React, { useEffect, useState } from "react";
import { Button, Editor, Loader, Page } from "../../components";
import { base_url } from "../../utils/url";
import { toast } from "react-hot-toast";

const getUrl = `${base_url}/setting`;
const editUrl = `${base_url}/edit-setting`;
const type = "Help";

const Help = () => {
  const [loading, setLoading] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [state, setState] = useState("");

  console.log("state", state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      formdata.append("type", type);
      formdata.append("message", state);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(editUrl, requestOptions);
      const json = await res.json();

      if (json.success) {
        toast.success("Updated successfully!");
      } else {
        toast.error("Failed to update!");
      }
    } catch (error) {
      toast.error("Failed to update!");
      console.error(error);
    } finally {
      setToggleBtn(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("type", type);

      const requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(getUrl, requestOptions);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data.message;
        setState(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="Help" enableHeader>
      <main className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-end w-full border-gray-200 rounded-b"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <Editor {...{ state, handleChange: setState, id: "1" }} />
              <Button
                type="submit"
                isLoading={toggleBtn}
                title={toggleBtn ? "Updating" : "Update"}
                extraStyles={toggleBtn ? "mt-2 !py-1.5" : "mt-2 !py-2.5"}
              />
            </>
          )}
        </form>
      </main>
    </Page>
  );
};

export default Help;
