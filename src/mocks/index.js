const dbStep1 = require("./db/db-step1.json");
const dbStep2 = require("./db/db-step2.json");

module.exports = () => ({
  departments: dbStep1,
  locations: dbStep2,
});
