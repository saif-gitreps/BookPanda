const express = require("express");
const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/:id", bookController.getBookById);

router.get("/get-book", bookController.getBook);

module.exports = router;
