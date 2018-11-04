var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var postSchema = new mongoose.Schema({
   title: String,
   content: String,
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
       }
     ]
});

var User = mongoose.model("User", userSchema);

// User.create({
//     name: "Bob",
//     email: "bobby@mail.com"
// });

// Post.create({
//     title: "Kolmas posti",
//     content: "Kolmannen postin contentti!!!" }, function(err, post){
//     if (!err){
//         User.findOne({name: "Bob"}, function(err, user){
//             if (!err)
//             {
//                 user.posts.push(post);
//                 user.save(function(err, savedUser){
//                     if (!err)
//                     {
//                         console.log("USER SAVED!");
//                         console.log(savedUser);
//                     }
//                 });
//             }
//         });
//     }
// });

User.findOne({name: "Bob"}).populate("posts").exec(function(err, user){
    if (!err)
    {
        console.log("FOUND USER");
        console.log(user);
    }
});

// newUser.posts.push({
//   title: "Tämä on kaisa postaus",
//   content: "Mitä tässä kerrottaisiin. Lorem ipsun jne. varmaankin....:D:D:D:"
// });

// newUser.save(function(err, user){
//     if (err)
//     {
//         console.log("ERROR!");
//     } else {
//         console.log("OK!");
//     }
// });


// User.findOne({name: "Kaisa"}, function(err, user){
//     if (err)
//     {
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "Tämä on uusi post KAISA", 
//             content: "Uuden postin tekstiä. Jatkuuu.."
//         });
//         user.save(function(err, updatedUser){
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(updatedUser);
//             }
//         });
//     }
// });

