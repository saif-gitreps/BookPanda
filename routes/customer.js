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
   console.log(customer[0][0]);
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
   await db.query("update customer set books_borrowed = ? where id = ?", [
      customer[0][0].books_borrowed + 1,
      req.params.id,
   ]);
   res.redirect(`/customer/${req.params.id}`);
});

module.exports = router;
