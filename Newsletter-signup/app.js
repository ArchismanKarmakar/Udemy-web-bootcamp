//*jshint esversion: 6 */

// ----------required packages---------//
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

// new instance of express
const app = express();

//mailChimp api key
//api key 9ce57838bb9afdd4c3dcab4359d611e3-us2
//Mailchimp list id  = 9a650ee494

//app.use
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members':[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }
  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

  // NOTE: The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP
  //       AS THIS CODE WILL BE PUSHED TO PUBLIC GITHUB

var jsonData = JSON.stringify(data);
const url = "https://us2.api.mailchimp.com/3.0/lists/9a650ee494";

const options = {
  method:"POST",
  auth:"deepa1:9ce57838bb9afdd4c3dcab4359d611e3-us2"
}

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }

response.on("data",function(data){
  console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});


app.post("/failure", function (req, res){
  res.redirect("/");
});

//to test the app locally in port 3000
// app.listen(process.env.PORT || 3000, function(){
app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});