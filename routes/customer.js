const express = require("express");
const db = require("../database/data");

const router = express.Router();

router.get("/customer/:id", (request, response) => {
   response.render("customer");
});

module.exports = router;
