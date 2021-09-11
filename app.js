//ExpressJS boilerplate
const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-ahmad:lalo123@cluster0.cuu4c.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = mongoose.Schema({
    name: String
});
const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your to do list"
});
const item2 = new Item({
    name: "Add the item by typing and pressing the + button"
});
const item3 = new Item({
    name: "Remove the item by checking the box"
});

const listSchema = mongoose.Schema({
    name: String, 
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);
const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
    Item.find({}, (err, items)=>{
        if (items.length === 0) {
            Item.insertMany(defaultItems, (err)=>{
                if(err){
                    console.log(err);
                }
                res.redirect("/");
            });
        }
        else {
            res.render("list", {items: items, today: "Today"});
        }
    });
});

app.post("/", (req, res) => {
    const itemName = req.body.listItem;
    const listName = req.body.list;
    const newItem = new Item({
        name: itemName
    });

    if(listName === "Today"){
        newItem.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, (err, docs)=>{
            if(!err){
                docs.items.push(newItem);
                docs.save();
                res.redirect("/" + listName);
            }
        });
    }
});

app.post("/delete", (req,res) => {
    const listName = req.body.list;
    const checkedItemId = req.body.checkedItem;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Item was successfully deleted");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items:{_id: checkedItemId}}}, (err, docs)=>{
            if(!err){
                res.redirect("/" + listName);
            }
        });
    } 
});

app.get("/:listName", (req, res)=>{
    const listName = _.capitalize(req.params.listName); 
    List.findOne({name : listName}, (err, docs)=>{
        if(!err){
            if(docs){
                res.render("list", {items: docs.items, today: docs.name});
            }else{
                const list = new List({
                    name: listName,
                    items: defaultItems
                });
                list.save();
                // res.render("list", {items: list.items, today: list.name});
                res.redirect("/" + listName);
            }
        }else{
            console.log(err);
        }
    });
});

app.get("/about", (req, res)=>{
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 2222;
}


app.listen(port, () => {
    console.log("App running on port 2222");
});
