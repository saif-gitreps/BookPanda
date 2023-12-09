const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/customer/:id", async (request, response) => {
   const sellerData = await db.query(
      "select id, name, address, DATE_FORMAT(joindate, '%M-%y') AS joinDate from seller"
   );
   console.log(sellerData[0]);
   response.render("customer", { sellers: sellerData[0] });
});

module.exports = router;
