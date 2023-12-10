const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/seller/:id", async (request, response) => {
   const sellerBooks = await db.query(`select * from book_shelf where seller_id = ?`, [
      request.params.id,
   ]);
   response.render("booklist", {
      books: sellerBooks[0],
      customerId: request.query.customerId,
   });
});

module.exports = router;
