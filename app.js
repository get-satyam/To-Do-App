//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const date = require(__dirname + "/date.js");

// console.log(date());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let day = "";
let items_array = [];
let workItems = [];

app.get("/", function (req, res) {

    // let day = date();
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("hi-IN", options);
    

    res.render("list", {
        listTitle: day,
        newListItem: items_array
    });

});

app.post("/", function (req, res) {
    let item = req.body.New_Item;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items_array.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {

    res.render("list", {
        listTitle: "Work List",
        newListItem: workItems
    });

});

app.get("/about", function(req, res){
    res.render("about");
});
app.post("/work", function (req, res) {

    let item = req.body.New_Item;
    workItems.push(item);
    res.redirect("/work");

})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server Up and running on port 3000");
});