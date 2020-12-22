
var	express       = require("express"),
app           = express(),
bodyparser    = require("body-parser"),
mongoose      = require("mongoose"),
passport      = require("passport"),
LocalStrategy = require("passport-local"),

methodOverride = require("method-override"),
flash         = require("connect-flash"),

User          = require("./models/user");


var  indexRoutes      =  require("./routes/index"),
	 oneRoutes = require("./routes/one");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://jevin:password@cluster0.otar5.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true
}).then(() =>{
console.log("connected to DB");
}).catch(err => {
console.log('error:', err.message);
});




app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
secret: "once again",
resave: false,
saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
});


app.use("/", indexRoutes);
app.use("/", oneRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
console.log("CovidStatus Server has Started");
});