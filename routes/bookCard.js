const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/book-card/:id", async (request, response) => {
   const book = await db.query(`select * from book_shelf where id = ?`, [
      request.params.id,
   ]);
   console.log(book[0][0]);
   response.render("bookcard", { book: book[0][0] });
});

module.exports = router;
