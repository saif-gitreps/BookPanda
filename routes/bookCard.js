const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/book-card/:id", async (request, response) => {
   const book = await db.query(`select * from book_shelf where id = ?`, [
      request.params.id,
   ]);
   console.log(book[0][0]);
   response.render("bookcard", {
      book: book[0][0],
      customerId: request.query.customerId,
   });
});

router.get("/search", async (request, response) => {
   const searchQuery = request.query.SEARCH;
   const bookMatch = await db.query(
      `select * from book_shelf where author like '%${searchQuery}%' OR title like '%${searchQuery}%' OR category like '%${searchQuery}%'`,
      [searchQuery, searchQuery, searchQuery]
   );
   console.log(bookMatch[0]);
   response.render("result", {
      result: bookMatch[0],
      customerId: request.query.customerId,
   });
});

module.exports = router;
