"user strict";
// var cfg = require("./knex-cfg").client;
// var screen = require('./screen');
// screen.clear();
var screen = require('./screen');
var db = require('./db');
var users = require('./users-repo');
var formidable = require('formidable');
var axios = require('axios');
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const app =  express();

// const store = require('./route/store.js')
app.use(bodyParser.urlencoded({
  extended: false 
}));
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.post('/users',(req, res) => {
    // TODO insert user
    console.log(req.body);
const firstname = req.body.firstname ? req.body.firstname : '';
const lastname = req.body.lastname ? req.body.lastname : '';
const email = req.body.email ? req.body.email : '';
const password = req.body.password ? req.body.password : '';

if (!firstname) {
    return res.json({success: false, message: 'firstname is required'});
}else if (!lastname){
    return res.json({success: false, message: 'lastname is required'});
}else if (!email){
    return res.json({success: false, message: 'email is required'});
}else if (!password){
    return res.json({success: false, message: 'password is required'});
}
knex('users')
    .insert({firstname,lastname,email, password})
    .then((id) => {
    //get user by id
    knex('users')
        .select({
        id: 'id',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email',
        password: 'password',
    })
        .where({id})
        .then((users) => {
        return res.json(users[0]);
    })
})
    .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
});
});


// var port = 5000;
// app.get('/', function(req,res){
//     res.send("Hello WORLD");
// });
// app.listen(5000, function(err){
//     console.log('Runing on Port '+ port);
// });
// var router = function (){
//     authRouter.route('/signup')
//     .post(function (req, res){
//         console.log(req.body);
//     });
//     return req.body;
// };


// app.use(express.static('public'))
// app.use(bodyParser.json())

// app.post('/createUser', (req, res) => {
//   store
//     .createUser({
//       firstname: req.body.firstname,
//       lastname:  req.body.lastname,
//       email:     req.body.email,
//       password:  req.body.password
//     })
//     .then(() => res.sendStatus(200))
//     console.log(req.body);
// })
// app.listen(7555, () => {
//   console.log('Server running on http://localhost:7555')
// })


     

// screen.clear();

// users.AddUsers(new_user).then(function(result){
//     screen.write(result);
// })
// .catch(function(err){
//   screen.write('Ooops')
//   console.log(err);
// })
// .finally(function(){
//     // knex.destroy();
// })




/* RUNING ON PORT GET DATA USEING AXIOS PACKAGE  */ 
 
// axios({
//   method: 'post',
//   url: 'http://localhost:8080/users',
//   data: {
//      firstname: ['mohan'],
//      lastname: ['verma'],
//      email: ['mohan@gmail.com'],
//      password: ['12345678']
//   }
//   TransformRequest: () => {
//     const newData = data;
//     return JSON.stringify(newData);
//   }
// })
// .then((response) => {
//   console.log(response.data);
// })
// .catch((error) => {
//   console.log(error); 
// })
// const server = http.createServer();

// var new_user = { firstname: 'mohan', lastname: 'verma', email: 'mohan@gmail.com', password: 12345678 };




// var new_user = { firstname: 'mohan', lastname: 'verma', email: 'mohan@gmail.com', password: 12345678 };




























// const http = require('http');


// const server = http.createServer();
// server.on('request', (request, response) => {
  
//     console.log('this is an incoming request');
// });

// server.listen(8040);























/* VALIDATING DATA  */ 

// users.listUsersByEmail("kumar@gmail.com").then(function(result){
//    screen.write(result , "json");
// })
// .catch(function(err){
//     screen.write('Ooops');
//     screen.write(err);
// })
// .finally(function(){
//   db.destroy();
// });















/* TRANSACTIONS  */ 
//  var anmol = [
//      { name: "hello", email:"hello@gmail.com", phone:"98885411406", country: 'INDIA' },
//      { name: "ANMOL ", email:"anmol5@gmail.com", phone:"981488511406", country: 'INDIA' }

//     ];
//  var shubham = { name: "shubham kumar", email:"shubham@gmail.com", phone:"9888541406",country: 'INDIA' };


// knex.transaction(function(trx){
//     trx
//     .insert(anmol).into('mytable')
//     .then(function(idArr)
//     {
//         var personID = idArr[0];
//         for(var i = 0; i < anmol.length; i++)
//         {
//             anmol[i].id = personID; 
//         }
//         return trx.insert(anmol).into('mytable')
//     });
// }).then(function(){
//     screen.write(anmol.length + 'anmol instserted', 'pretty');
// }).catch(function(err){
//     console.log(err);
// }).finally(function(){
//     knex.destroy();
// })








/*  INSERT UPDATE DELETE    */

//  var anmol = { name: "ANMOL VERMA", email:"anmol@gmail.com", phone:"9888511406", country: 'INDIA' };
//  var shubham = { name: "shubham kumar", email:"shubham@gmail.com", phone:"9888541406",country: 'INDIA' };
//  var kumar = { name: "kumar rao", email:"kumar@gmail.com", phone:"9884511406",country: 'INDIA' };
//  var sachin = { name: "sachin singh", email:"sachin@gmail.com", phone:"9888514465" ,country: 'INDIA'};
//  var country = {country: 'INDIA'};
// knex("mytable").where('id', '=', 11).update(country)
// .then(function(count)
// {
//       console.log(count); 
//       return knex('mytable').select('id', '=', 11)
// })
// .then(function(rows){
//     screen.write(rows, 'pretty');
// })
// .finally(function(){
//     knex.destroy();
// })














/*    OLD    */ 




// var new_id = 10;
// var query = knex.raw("SELECT * FROM mytable WHERE id = ?", + [new_id]);
// run(query, "pretty");



// function run(knexQuery, mode){
// return knexQuery.then(function(rows){
//     screen.write(rows);
// })
// .catch(function(err){
//     screen.write("Ooops");
//     screen.write(err);
// })
// .finally(function(){
//     knex.destroy();
// })
// }
