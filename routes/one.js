
var express= require("express");
var app = express();
var router = express.Router();
var middleware = require("../middleware/index.js");


router.get("/one" , middleware.isLoggedIn, function(req, res){
   res.render("one.ejs");
});

module.exports = router;