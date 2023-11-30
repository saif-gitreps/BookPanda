const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/", (request, response) => {
   response.render("login", { message: "" });
});

router.post("/login", async (request, response) => {
   const loginData = request.body;

   if (loginData.TYPE == "seller") {
      const data = await db.query("select * from seller where email = ?", [
         loginData.EMAIL,
      ]);
      const sellerData = data[0];
      if (sellerData.length == 0) {
         response.render("index", {
            message: "No such email exists, Create an account to login.",
         });
      } else if (sellerData[0].password !== loginData.PASSWORD) {
         response.render("index", { message: "Incorrect password, please retry again." });
      } else {
         response.redirect(`/seller/${sellerData[0].id}`);
      }
   } else {
      const data = await db.query("select * from customer where email = ?", [
         loginData.EMAIL,
      ]);
      const customerData = data[0];
      if (customerData.length == 0) {
         response.render("index", {
            message: "No such email exists, Create an account to login.",
         });
      } else if (customerData[0].password != loginData.PASSWORD) {
         response.render("index", { message: "Incorrect password, please retry again." });
      } else {
         response.redirect(`/customer/${customerData[0].id}`);
      }
   }
});

module.exports = router;
