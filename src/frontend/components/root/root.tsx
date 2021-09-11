import React, { useEffect, useState } from "react";
import Area from "../SearchArea";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { searchBoulders, fetchDatabase } from "./toMiddleware";
import { SearchTable } from "../SearchTable";
import { ShowClimbedButton } from "../GetButton";
import { DatabaseTable } from "../DatabaseTable";
import { GoBackButton } from "../GoBackButton";

const root = () => {
  const [searchedBoulder, setSearched] = useState([]); //Sets the state to the result of the webscraper
  const [fetchedBoulders, setFetch] = useState([]); //Sets the state to the fetched entries of the climbs database

  const onClick = () => {
    fetchDatabase(setFetch);
  };
  useEffect(() => {
    console.log('This might be the end, my friend:' + searchedBoulder)
  })

  return (
    <Router>
      <div className="Root">
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <h1>Search Area...</h1>
              <Area onSearch={searchBoulders(setSearched)} />
              <ShowClimbedButton onClick={onClick} />

              <SearchTable setData={searchedBoulder} />
            </>
          )}
        />
        <Route
          path="/database"
          exact
          render={(props) => (
            <>
              <GoBackButton />
              <DatabaseTable setData={fetchedBoulders} />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default root;