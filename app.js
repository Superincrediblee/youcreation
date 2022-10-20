const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const ejs=require("ejs");
const app= express();
const mongoose =require("mongoose")
mongoose.connect("mongodb://localhost:27017/peoplesDB",{useNewUrlParser:true})
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
 //function toLower(v) {
 //   return v.toLowerCase();
 // }
const peoplesSchema = ({
    name:{type: String,
        required:[true, "please check your data entry, no name"]
    },
     email: { type: String, 
        //set: toLower,
        lowercase: true,
        unique:true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     }, 
    contact:{type:Number,
    required:[true, "please check your data entry, no number,"]}

})
const People = mongoose.model("People", peoplesSchema )

/* const peoples = new People({
    name: "jo",
    email: "q@gmail.com",
    contact: 2222222
})  */
 //peoples.save()
 app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("index")
})
app.get("/about",function(req,res){
    res.render("about")
})
app.get("/portfolio",function(req,res){
    res.render("portfolio")
})

app.get("/Signup",function(req,res){
    res.render("Signup")
})
app.get("/success",function(req,res){
    res.render("success")
})
app.post("/Signup",function(req,res){
   let username = req.body.user
   let email = req.body.address
   let number = req.body.contact 
   const people = new People({
    name:username,
    email:email,
    contact:number
  })
  people.save() 
  res.redirect("success")
})


app.get("/team",function(req,res){
    res.render("team")
})
app.get("/services",function(req,res){
    res.render("services")
}) 

 app.listen(5000,function(){
    console.log("Server started on port 5000")
}) 