const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const ejs=require("ejs");
const app= express();
let posts = [];
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
/* Blog articles content */
const homecontent = "CREATING A BETTER YOU"
const aboutp ="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, labore reiciendis. Assumenda eos quod animi! Soluta nesciunt inventore dolores excepturi provident, culpa beatae tempora, explicabo corporis quibusdam corrupti. Autem, quaerat. Assumenda quo aliquam vel, nostrum explicabo ipsum dolor, ipsa perferendis porro doloribus obcaecati placeat natus iste odio est non earum?"
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("index",{startcontent:homecontent})
})
app.get("/about",function(req,res){
    res.render("about", {aboutcontent:aboutp,
    posts:posts
    })
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
app.get("/compose", function(req,res){
    res.render("compose", {})
})
app.post("/compose",function(req,res){
    var post ={
        title:req.body.posttitle,
        content:req.body.postcontent
    }
    posts.push(post)
    res.redirect("about")
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
const port = process.env.PORT || 8888;

 app.listen(port,function(){
    console.log("Server has  started successful on port " + port)
})
