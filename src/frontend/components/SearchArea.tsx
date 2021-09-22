import React, { useState } from "react";
import "./styles/table.css";

export const Area = ({ onSearch }) => {
  const [area, setArea] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //Gets the boulders from the second section of a supplied area
    e.preventDefault();
    if (!area) {
      alert("Please add an area");
      return;
    }
    function getBoulders(area: string) {
      const URL = "http://localhost:3000/boulder/" + area;
      const boulders = fetch(URL, {
        method: "GET",
        credentials: "same-origin",
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err.message));
      return boulders;
    }
    await getBoulders(area)
      .then((res) => {
        if (res == null) {
          throw Error("Could not contact server");
        }
        if (res.length === 0) {
          throw Error("Area not found");
        }
        setError(null);
        onSearch(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <form className="area-form" onSubmit={onSubmit}>
      {error && <div>{error}</div>}
      <div className="form-control">
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
    </form>
  );
};
export default Area;
