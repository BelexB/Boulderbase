import React, { useState } from "react";
import { Area } from "../SearchArea";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchDatabase } from "../../helper/rootHelper/toMiddlewareHelper";
import { Table } from "../Table";
import { ShowClimbedButton } from "../GetButton";
import { GoBackButton } from "../GoBackButton";
import columnsHelper from "../../helper/rootHelper/columnsHelper";

const root = () => {
  const [searchedBoulder, setSearched] = useState([]); //Sets the state to the result of the webscraper
  const [fetchedBoulders, setFetch] = useState([]); //Sets the state to the fetched entries of the "boulders" database
  const [toDelete, setDelete] = useState(null);
  const search = 0;
  const fetch = 1;

  const onClick = () => {
    fetchDatabase(setFetch);
  };
  if (toDelete) {
    const newFetch = fetchedBoulders.filter((boulder) => {
      return boulder != toDelete;
    });
    setFetch(newFetch);
    setDelete(null);
  }
  return (
    <Router>
      <div className="Root">
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <h1>Search Area...</h1>
              <Area onSearch={setSearched} />
              <ShowClimbedButton onClick={onClick} />

              <Table
                tableData={searchedBoulder}
                columns={columnsHelper(search)}
                deleteBoulder={setDelete}
              />
            </>
          )}
        />
        <Route
          path="/database"
          exact
          render={(props) => (
            <>
              <GoBackButton />
              <Table
                tableData={fetchedBoulders}
                columns={columnsHelper(fetch)}
                deleteBoulder={setDelete}
              />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default root;
