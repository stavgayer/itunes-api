const router = require("express").Router();
const mongoose = require("mongoose");
const SearchTerm = mongoose.model("SearchTerm");
require('isomorphic-fetch')

//Create or update search term counter
router.post("/search", (req, res, next) => {
  console.log("im Here", req.body);
  let searchQuery = { searchTerm: req.body.searchTerm };
  SearchTerm.findOneAndUpdate(
    searchQuery,
    { $inc: { counter: 1 } },
    { upsert: true, new: true }
  )
    .then(() => res.status(200).json({ message: "Search accepted" }))
    .catch(next);
});

router.get("/top-searches", (req, res, next) => {
  SearchTerm.find()
    .limit(10)
    .sort({ counter: -1 })
    .lean()
    .then(results => res.json(results))
    .catch(next);
});

//Temporary solution 
//From some annoying reason i cant fetch Itunes Search API without getting fetch error even after i handled cors on server side 
//and even after i used mode : 'no-cors' on the req i got CORB error .
//after quick search i found out this is common thing with itunes-api.  
//this is why i created this proxy route to handle the req
//isomorphic-fetch used to use Fetch api in node , (Temporary solution - There's probably A better way)
//*TO-DO*: Find out why it stopped working the next day , because it used to work for me and i didnt change nothing :(


router.get("/queryItunes", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  fetch(
    `https://itunes.apple.com/search?term=${
      req.query.searchTerm
    }&entity=musicVideo&limit=25`
  )
    .then(rawResult => {
      if (rawResult.ok) {
        return rawResult.json();
      } else {
        throw new Error("Fetching Itunes Search API failed");
      }
    })
    .then(results => res.json(results))
    .catch(err => next(err));
});
module.exports = router;
