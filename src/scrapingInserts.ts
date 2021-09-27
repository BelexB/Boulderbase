import forEach from "lodash/forEach";
import { BoulderType } from "./models/boulderType";

const getConnection = require("./database");

export function newScrapedSection(cragName: String): void {
  //Saves the areas and date of the scraped section to the "scraped" table. Date defaults to now()
  getConnection(function (err, client): void {
    client
      .query(
        "INSERT INTO scraped (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [cragName]
      )
      .then(client.release());
  });
}
export function existingScrapedSection(cragName: String): void {
  //Updates the date of the section in the "scraped" database
  getConnection(function (err, client): void {
    client
      .query("UPDATE scraped SET scraping_date = now() WHERE name = ($1)", [
        cragName,
      ])
      .then(client.release());
  });
}
export function scrapedBoulders(boulders: BoulderType[], area: String): void {
  //Saves the boulders of the scraping to the "scrapedBoulders" database
  forEach(boulders, function (boulder: BoulderType) {
    getConnection(function (err, client): void {
      client
        .query(
          "INSERT INTO scrapedBoulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
          [boulder.name, boulder.grade, area]
        )
        .then(client.release());
    });
  });
}
