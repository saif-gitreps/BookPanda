const express = require("express");

app = express();

app.get("/", (request, response) => {
   response.send("hello");
});

app.listen(3000, () => {
   console.log("server initiated.");
});
