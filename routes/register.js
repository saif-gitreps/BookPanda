const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/register", (request, response) => {
   response.render("register", { message: "" });
});

router.post("/register", async (request, response) => {
   const formData = request.body;
   if (formData.TYPE == "SELLER") {
      const sellerData = await db.query("select * from seller where email = ?", [
         formData.EMAIL,
      ]);
      if (sellerData[0].length != 0) {
         return response.render("register", {
            message: "email already exist, choose a different one.",
         });
      }
      if (formData.PASSWORD != formData.CPASSWORD) {
         return response.render("register-page", { message: "passwords do not match" });
      }
      await db.query(
         "insert into seller(name,email,address,password,books_sold,books_lent) value(?,?,?,?,?,?)",
         [formData.NAME, formData.EMAIL, formData.ADDRESS, formData.PASSWORD, 0, 0]
      );
   } else {
      const currentCustomers = await db.query("select * from customer where email = ?", [
         formData.EMAIL,
      ]);
      if (currentCustomers[0].length != 0) {
         return response.render("register", {
            message: "email already exist, choose a different one.",
         });
      }
      if (formData.PASSWORD != formData.CPASSWORD) {
         return response.render("register-page", { message: "passwords do not match" });
      }
      await db.query(
         "insert into customer(name,email,address,password,books_purchased,books_borrowed) value(?,?,?,?,?,?)",
         [formData.NAME, formData.EMAIL, formData.ADDRESS, formData.PASSWORD, 0, 0]
      );
   }
   response.send(
      `<h3 style="text-align:center;  
      color:black">
      Account created, click <a href="/">here</a> to login.</h3>`
   );
});

module.exports = router;
