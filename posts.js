const fs = require('fs')
const database = require('./db.js')
const { ObjectId } = require('mongodb')

function add({ title, description }) {

    var post = database.collection('posts').insertOne({
        title: title,
        description: description,
        comments: []
    })

    return post
}

function list() {
    const posts = database.collection('posts').find().toArray()
    return posts
}

function getPostById(id) {
    var post = database.collection('posts')
        .findOne({ _id: ObjectId(id) })
    return post
}

function deletePostById(id) {
    database.collection('posts').deleteOne({ _id: ObjectId(id) })
    return {}
}

async function editPost({ id, title, description }) {
    var post = await database.collection('posts')
        .findOne({ _id: ObjectId(id) })
        
    post = await database.collection('posts').updateOne({ _id: ObjectId(id) }, {
        $set: {
            title: title || post.title,
            description: description || post.description,
        }
    })
    
    return post
}

function addComment({ name, comment, post_id }) {
    var post = getPostById(post_id);
    if (post) {
        var comment = {
            name, comment, id: comment_id_counter
        }
        post.comments.push(comment)
        comment_id_counter++;
        return comment
    } else {
        return undefined
    }
}

function deleteComment({ comment_id, post_id }) {
    var post = getPostById(post_id);
    if (!post) {
        return undefined
    }
    post.comments = post.comments.filter(comment => comment.id != comment_id)
    return post
}

function editComment({ comment_id, post_id,comment, name }) {
    var post = getPostById(post_id);
    if (!post) {
        return undefined
    }
    var commentObject = post.comments.find(c => c.id == comment_id)
    if(!commentObject) return undefined
    if(comment) commentObject.comment = comment
    if(name) commentObject.name = name
    return post
}

module.exports.add = add;
module.exports.list = list;
module.exports.getPostById = getPostById;
module.exports.deletePostById = deletePostById;
module.exports.editPost = editPost;
module.exports.addComment = addComment;
module.exports.deleteComment = deleteComment;
module.exports.editComment = editComment;