var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




// ROOT ROUTE
router.get("/", function(req, res){
	res.render("landing");
});


//REGISTER FORM
router.get("/register", function(req, res){
	res.render("register", {page: 'register'});
});

//SIGN UP LOGIC
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username, firstName:req.body.firstName, lastName:req.body.lastName, email: req.body.email, avatar: req.body.avatar});
	
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("register");
		}
		passport.authenticate("local")(req, res,function(){
			req.flash("success", "Succesfully SignedUp" + user.username);
			res.redirect("/one");
		});
	});
});


//LOGIN FORM

router.get("/login", function(req, res){
	res.render("login", {page: 'login'}); 
});

//LOGIN PAGE LOGIC
router.post("/login", passport.authenticate("local",
	{
	successRedirect: "/one", 
	failureRedirect: "/login"}),
	function(req, res){	
});

// LOGOUT LOGIC
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!!!");
	res.redirect("/login");
});
 

module.exports = router;