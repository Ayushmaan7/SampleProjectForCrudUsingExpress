const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override")

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Initialize posts with UUIDs
let posts = [
    {
        id: uuidv4(), // Generate UUID for this post
        username: "Vikas",
        content: "Are Wo aane bala hai(IPL)",
    },
    {
        id: uuidv4(), // Generate UUID for this post
        username: "shourya",
        content: "Thala For a reason",
    },
    {
        id: uuidv4(), // Generate UUID for this post
        username: "Janmjay",
        content: "E sala cup namde",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    
    // Generate UUID for new post
    let id = uuidv4();
    console.log(id);n
    posts.push({ id ,username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post }); // Pass post object to the show.ejs template
});
app.patch("/posts/:id",(req, res)=>{
    let { id } = req.params;
    let newContent= req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => { 
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    if (!post) {
        // Handle the case where the post is not found
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});


app.listen(port, () => {
    console.log("listening to port : 8080");
});
