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
   const customer = await db.query("select * from customer where id = ?", [
      request.params.id,
   ]);
   response.render("userpage", {
      customer: customer[0][0],
   });
});

router.post("/customer/:id/update", async (req, res) => {
   await db.query(`update customer set name = ? , email = ?, password = ?`, [
      req.body.userName,
      req.body.userEmail,
      req.body.userPassword,
   ]);
   res.redirect(`/customer/${req.params.id}/profile`);
});

router.post("/customer/:id/buy", async (req, res) => {
   const customer = await db.query("select books_purchased from customer where id = ?", [
      req.params.id,
   ]);

   const seller = await db.query("select books_sold from seller where id = ?", [
      req.body.sellerId,
   ]);
   console.log(seller);
   await db.query("update seller set books_sold = ? where id = ?", [
      seller[0][0].books_sold + 1,
      req.body.sellerId,
   ]);
   await db.query("update customer set books_purchased = ? where id = ?", [
      customer[0][0].books_purchased + 1,
      req.params.id,
   ]);
   res.redirect(`/customer/${req.params.id}`);
});

router.post("/customer/:id/borrow", async (req, res) => {
   const customer = await db.query("select books_borrowed from customer where id = ?", [
      req.params.id,
   ]);
   const seller = await db.query("select books_lent from seller where id = ?", [
      req.body.sellerId,
   ]);
   await db.query("update seller set books_lent = ? where id = ?", [
      seller[0][0].books_lent + 1,
      req.body.sellerId,
   ]);
   await db.query("update customer set books_borrowed = ? where id = ?", [
      customer[0][0].books_borrowed + 1,
      req.params.id,
   ]);
   res.redirect(`/customer/${req.params.id}`);
});

module.exports = router;
