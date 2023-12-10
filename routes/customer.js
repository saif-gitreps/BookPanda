const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/customer/:id", async (request, response) => {
   const sellerData = await db.query(
      "select id, name, address, DATE_FORMAT(joindate, '%M-%y') AS joinDate from seller"
   );
   response.render("customer", { sellers: sellerData[0], customerId: request.params.id });
});

router.get("/customer/:id/profile", async (request, response) => {
   const customerData = await db.query("select * from customer where id = ?", [
      request.params.id,
   ]);
   response.render("customer", { customer: customer[0], customerId: request.params.id });
});

module.exports = router;
