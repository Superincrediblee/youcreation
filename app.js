const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const ejs=require("ejs");
const app= express();
const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://Elliotazzurri:england123@cluster0.reotwsp.mongodb.net/peoplesDB",{useNewUrlParser:true})
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
app.get("/failure", function(req,res){
    res.render("failure")
})
app.post("/Signup",function(req,res){
   let username = req.body.user
   let email = req.body.address
   let number = req.body.contact 
   People.findOne({email:email},function(err,Foundemail){
    if(!err){
        if(!Foundemail){
             const people = new People({
                name:username,
                email:email,
                contact:number
              }) 
               people.save() 
                res.render("success")   
               } else{
             res.redirect("failure") 

        }
    }
   })
  
})

app.get("/team",function(req,res){
    res.render("team")
})
app.get("/services",function(req,res){
    res.render("services")
})
let port = process.env.PORT;
if(port == null || port ==""){
    port == 5000
}
 app.listen(port,function(){
    console.log("Serverhas  started successful on port 5000")
}) 