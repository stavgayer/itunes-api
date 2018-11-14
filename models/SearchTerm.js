const mongoose = require('mongoose');

const SearchTermSchema = new mongoose.Schema({
    searchTerm : {type : String , lowercase : true , trim : true , required : [true , "Search term cannot be empty!"] , unique: true},
    counter : {type : Number , default : 1}
},{timestamps : true});

mongoose.model('SearchTerm' , SearchTermSchema);