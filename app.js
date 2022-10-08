
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')


const app = express();


app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect("mongodb://localhost:27017/userInfo")
const userSchema = new mongoose.Schema({email: String, password: String})


const User = new mongoose.model("User", userSchema)

app.route("/users")
.get(function(req,res){
    User.find(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
.post(function (req, res) {

    const newUser = new User({email: req.body.username, password: req.body.password})
    newUser.save(function (err) {
        if (! err) {
            res.send("success")
        } else {
            res.send(err)
        }
    })


})



// .post(function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     User.findOne({
//         email: username
//     }, function (err, founduser) {
//         if (err) {
//             res.send(err)
//         } else {
//             if (founduser) {

//                 if (result == true) {
//                     res.send("success")
//                 }


//             }
//         }
//     })
// })
.delete();

app.listen(2400, () => console.log("Server started on port 2400"))
