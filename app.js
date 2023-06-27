//Adding express to the javascript
const express=require("express");
const app=express();
const hbs = require("hbs");

//connecting database to main app.js file
require("./db/connect");

//Adding collection in the database
const Register = require("./models/registers");
const {json} = require("express");
app.use(express.urlencoded({extended:false}));

//making port to listen the response sent by server
const PORT=process.env.PORT || 3000;

//making path for static web pages to get hosted
const path=require("path");
const staticpath=path.join(__dirname,'../public');

//setting view engine type as hbs from several types such as(pug,hbs,handlebars,templates)
app.set("view engine", "hbs");


app.use(express.json());
app.use(express.static(staticpath));
//sending request to server and comparing with route, if matches => send or render next page or requested page
app.get("/",(req,res)=> {
    res.render("index")
    
});
app.get("/index",(req,res)=> {
    res.render("themepage")
    
});

app.get("/login", (req,res)=>{
    res.render("index")
});

app.get("/Register", (req,res)=>{
    res.render("Register")
});

app.get("/themepage", (req,res)=>{
    res.render("themepage")
});

app.post("/Register", async (req,res)=>{
   try{
        const pass = req.body.password;
        const cpass = req.body.confirmpassword;
        if(pass === cpass)
        {
            const vaidcustomer = new Register({
                name : req.body.name,
                age : req.body.age,
                gender : req.body.gender,
                phone : req.body.phone,
                Blood : req.body.Blood,
                email : req.body.email,
                password : pass,
                confirmpassword : cpass

            })

            const vaid = await vaidcustomer.save();
            res.status(201).render("index");

        } else{  
            res.render("PasswordError");
           // res.send("Password is not matching...");
        }

   }catch(error)
   {
    res.status(400).send(error);
   }
})


// for login page authentication

 app.post("/index", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await Register.findOne({email:email});
        if(usermail.password === password)
        {
            res.status(201).render("logoutthemepage");
        }else{
            res.render("indexpassworderror");
        }
    }catch(error)
    {
        res.status(400).render("indexemailerror");
    }
 })

app.get('*',(req,res)=>
{
    /*var fullUrl = req.get('host') + req.originalUrl;
    const array = fullUrl.split('/');
    const lastsegment = array[array.length-2]  */
    
    res.render("404", {
        ErrorComment:"OOPS Error aa gya",
    });
});




/*app.get("/",(req,res)=>{
    res.send("This is my home page by kalpit");
});

app.get("/about",(req,res)=>{
    res.send("This is about page by kalpit");
});*/
app.listen(PORT,()=>{
    console.log(`Routed to the port at some ${PORT}`);
});




















//app.post("/PasswordError", async (req,res)=>{
    //     try{
    //          const pass = req.body.password;
    //          const cpass = req.body.confirmpassword;
    //          if(pass === cpass)
    //          {
    //             const vaidcustomer = new Register({
    //                 name : req.body.name,
    //                 age : req.body.age,
    //                 gender : req.body.gender,
    //                 phone : req.body.phone,
    //                 Blood : req.body.Blood,
    //                 email : req.body.email,
    //                 password : pass,
    //                 confirmpassword : cpass
    
    //             })
    
    //             const vaid = await vaidcustomer.save();
    //             res.status(201).render("index");
    //          } else{  
    //              res.render("PasswordError");
    //             // res.send("Password is not matching...");
    //          }
     
    //     }catch(error)
    //     {
    //      res.status(400).send(error);
    //     }
    //  })