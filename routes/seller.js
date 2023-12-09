const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/seller/:id", async (request, response) => {
   const sellerBook = await db.query(`select * from book_shelf where seller_id = ?`, [
      request.params.id,
   ]);
   console.log(sellerBook);
   response.redirect("/");
});

module.exports = router;
