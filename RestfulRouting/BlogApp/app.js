var bodyParser  = require("body-parser"),
methodOverride  = require("method-override"),
expressSanitizer= require("express-sanitizer"),
express         = require("express"),
mongoose        = require("mongoose"),
app             = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "New blog post",
//     image: "https://images.unsplash.com/photo-1447684808650-354ae64db5b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d3786eeaf183b022befb24523a4e64a0&auto=format&fit=crop&w=1347&q=80",
//     body: "Life is soo good. I wanna help you to achieve your goals in life, It's simpler than you'd think!"
// });

// RESTful routes
app.get("/", function(req, res){
   res.redirect("blogs"); 
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err)
        {
            console.log("Error fetching the blogs");
        }
        else
        {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
   var blog = req.body.blog;
   console.log(blog.body);
   console.log("=============");
   //blog.body = req.sanitize(blog.body);
   console.log(blog.body);
   Blog.create(blog, function(err, newBlog){
       if (err)
       {
           console.log("ERROR! Cannot to create new blog post!");
       }
       else
       {
           console.log("New blog post created!");
       }
   });
   res.redirect("blogs");
});

app.get("/blogs/:id", function(req, res){
   var id = req.params.id;
   Blog.findById(id, function(err, blog){
      if (err)
      {
          console.log("Cannot fetch requested blog post");
      } else {
          res.render("show", {blog: blog});
      }
   });
});

app.get("/blogs/:id/edit", function(req, res){
   var id = req.params.id;
   Blog.findById(id, function(err, blog){
    if (err)
    {
        console.log("Cannot fetch requested blog post");
    } else {
        res.render("edit", {blog: blog});
     }
   });
});

app.put("/blogs/:id", function(req, res){
  var id = req.params.id;
  var blog = req.body.blog;
  Blog.findByIdAndUpdate(id, blog, function(err, editedBlog){
  //Blog.update({_id: id}, blog, function(err, editedBlog){
      if (err)
      {
          console.log("ERROR! Cannot to commit blog edit!");
      }
      else
      {
          console.log("Post edited!");
      }
  });
  res.redirect("/blogs/" + id);
});

app.delete("/blogs/:id", function(req, res){
   var id = req.params.id;
   Blog.findByIdAndRemove(id, function(err){
   //Blog.remove({_id: id}, function(err){
       if (err)
       {
           console.log("Cannot delete");
       } else {
           console.log("Blog deleted!");
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("SERVER IS RUNNING");  
}
);