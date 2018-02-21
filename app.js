var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var blogSchema= new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog= mongoose.model("Blog", blogSchema);
app.get("/", function(req, res){
	res.send("This is our homepage");
});
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});