const express = require('express')
const bodyParser = require('body-parser')
const Posts = require('./posts.js')
var app = express()

app.use(bodyParser.json())



//TODO POST 	/posts     add ( add post )
app.post('/posts', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var post = Posts.add({ title, description })
    res.send(post)
})
//TODO GET  	/posts ( list posts )
app.get('/posts', (req, res) => {
    var posts = Posts.list();
    res.send(posts)
})
//TODO GET  	/posts/:post_id ( get post )
app.get('/posts/:post_id', (req,res) => {
    var post_id = req.params.post_id;
    var post = Posts.getPostById(post_id);

    if (post){
        res.send(post)
    } else {
        res.status(404).send('Post Not Found')
    }
})
//TODO DELETE   	/posts/:post_id (delete post)
app.delete('/posts/:post_id', (req,res) => {
    var post_id = req.params.post_id;
    Posts.deletePostById(post_id)
    res.send({})
})

//TODO PUT      	/posts/:post_id (edit post)
app.put('/posts/:post_id', (req,res) => {
    var post_id = req.params.post_id;
    var title = req.body.title;
    var description = req.body.description;
    var post = Posts.editPost({ id: post_id, title, description })
    if (post){
        res.send(post)
    } else {
        res.status(404).send('Post Not Found')
    }
})

//TODO POST     	/posts/:post_id/comments (add comment to post)
app.post('/posts/:post_id/comments', (req, res) => {
    var post_id = req.params.post_id;
    var comment = req.body.comment;
    var name = req.body.name;
    var post = Posts.addComment({ name, comment, post_id })
    res.send(post)
})

//TODO DELETE   	/posts/:post_id/comments/:comment_id (delete comment from post)
app.delete('/posts/:post_id/comments/:comment_id', (req, res) => {
    var post_id = req.params.post_id;
    var comment_id = req.params.comment_id;
    Posts.deleteComment({ post_id, comment_id })
    res.send({})
})

//TODO UPDATE   	/posts/:post_id/comments/:comment_id (update comment)
app.put('/posts/:post_id/comments/:comment_id', (req, res) => {
    var post_id = req.params.post_id;
    var comment_id = req.params.comment_id;
    var comment = req.body.comment;
    var name = req.body.name;
    var comment = Posts.editComment({ post_id, comment_id, comment, name })
    res.send({})
})
app.listen(200, () => {
    console.log('server is running on port 200')
})
