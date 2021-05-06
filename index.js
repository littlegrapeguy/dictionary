const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.static('public'));
app.use(require('express-minify-html-terser')({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: false,
    removeEmptyAttributes: false,
    minifyJS: true
  }
}));

app.all("/", async (req, res) => {
  res.render("search.ejs")
});

app.all("/:word", async (req, res) => {
  const data = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + encodeURIComponent(req.params.word));
  if (!data.ok) return res.render("error.ejs");
  res.render("word.ejs", {
    data: (await data.json())[0]
  })
});

const listener = app.listen(8000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

"";
