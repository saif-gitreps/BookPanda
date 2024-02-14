const express = require("express");
const db = require("../database/data");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/login", (request, response) => {
   response.render("login", { message: "" });
});

router.post("/login", userController.submitLogin);

module.exports = router;
