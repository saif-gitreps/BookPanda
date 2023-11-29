const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/register", (request, response) => {
   response.render("register", { message: "" });
});

router.post("/register", async (request, response) => {
   const formData = request.body;
   console.log(formData);
   const currentCustomers = await db.query("select * from customer where email = ?", [
      formData.EMAIL,
   ]);
   // const admin = await db.query("select * from admin where email = ?", [formData.EMAIL]);
   // this is bascially checking if there is a user already.
   if (currentCustomers[0].length != 0) {
      return response.render("register", {
         message: "email already exist, choose a different one.",
      });
   }
   if (formData.PASSWORD != formData.CPASSWORD) {
      return response.render("register-page", { message: "passwords do not match" });
   }
   await db.query(
      "insert into customer(name,email,password,books_purchased,books_borrowed) value(?,?,?,?,?)",
      [formData.NAME, formData.EMAIL, formData.PASSWORD, 0, 0]
   );
   response.send(
      `<h3 style="text-align:center; 
      background-color:black; 
      color:white">
      Account created, click <a href="/">here</a> to login.</h3>`
   );
});

module.exports = router;
