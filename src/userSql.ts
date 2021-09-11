const { client } = require("./database");
let clientImp;
client.then((data) => (clientImp = data));

export function addToDbSingle(boulder: any) {
  //Adds the clicked boulder to the "so-far climbed"-database
  try {
    clientImp.query(
      "INSERT INTO boulders (name, grade, area) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
      [boulder.name, boulder.grade, boulder.area]
    );
  } catch (err) {
    console.log(err);
  }
}

export function addToDbMultiple(boulders: string[]) {
  //No function yet, planned to add multiple boulders to the "so-far climbed"-database
  const name = 0;
  const grade = 1;

  for (var i = 0; i < boulders[name].length; i++) {
    clientImp.query("INSERT INTO boulders (name, grade) VALUES ($1, $2)", [
      boulders[name][i],
      boulders[grade][i],
    ]);
  }
}
export function getFromDb() {
  //Gets all boulder from the "so-far climbed"-database
    return clientImp.query("SELECT name,grade,area FROM boulders");
}
