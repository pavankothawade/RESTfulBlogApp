var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

var blogSchema= new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog= mongoose.model("Blog", blogSchema);

//INDEX ROUTE
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index", {blogs: blogs});		
		}
	});
	
});

app.post("/blogs" ,function(req, res){
	
	Blog.create(req.body.blog, function(err, blogs){
		if(err){
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});

app.get("/", function(req, res){
	res.redirect("/blogs");
});
app.get("/blogs/new", function(req,res){
	res.render("new");
});
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog: foundBlog});
		}
	});

});

//EDIT Route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.rendirect("/blogs");
		}else{
				res.render("edit", {blog: foundBlog});
		
		}
	});
	});

//UPDATE Route

app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" +req.params.id);
		}
	});
});

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});