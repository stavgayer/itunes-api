const router = require("express").Router();
const mongoose = require("mongoose");
const SearchTerm = mongoose.model("SearchTerm");

//Create or update search term counter
router.post("/search", (req, res, next) => {
  console.log("im Here", req.body);
  let searchQuery = { searchTerm: req.body.searchTerm };
  SearchTerm.findOneAndUpdate(
    searchQuery,
    { $inc: { counter: 1 } },
    { upsert:true , new: true }
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

module.exports = router;
