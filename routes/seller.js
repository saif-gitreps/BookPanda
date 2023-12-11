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

router.get("/seller/:id/profile", async (request, response) => {
   const seller = await db.query(
      "select *, DATE_FORMAT(joindate, '%d-%M-%y') AS joinDate from seller where id = ?",
      [request.params.id]
   );
   console.log(seller);
   response.render("sellerprofile", { seller: seller[0][0] });
});

router.post("/seller/:id/update", async (req, res) => {
   await db.query(`update seller set name = ? , email = ?, password = ?`, [
      req.body.userName,
      req.body.userEmail,
      req.body.userPassword,
   ]);
   res.redirect(`/seller/${req.params.id}/profile`);
});

router.get("/seller/:id/newbooks", async (request, response) => {
   response.render("add-books", { sellerId: request.params.id });
});
module.exports = router;
