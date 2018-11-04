var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
   title: String,
   content: String,
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
    name: "Kaisa",
    email: "jusu82@mail.com"
});

newUser.posts.push({
  title: "Tämä on kaisa postaus",
  content: "Mitä tässä kerrottaisiin. Lorem ipsun jne. varmaankin....:D:D:D:"
});

// newUser.save(function(err, user){
//     if (err)
//     {
//         console.log("ERROR!");
//     } else {
//         console.log("OK!");
//     }
// });


User.findOne({name: "Kaisa"}, function(err, user){
    if (err)
    {
        console.log(err);
    } else {
        user.posts.push({
            title: "Tämä on uusi post KAISA", 
            content: "Uuden postin tekstiä. Jatkuuu.."
        });
        user.save(function(err, updatedUser){
            if (err) {
                console.log(err);
            } else {
                console.log(updatedUser);
            }
        });
    }
});

