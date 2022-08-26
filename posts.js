var posts = [];
var post_id_counter = 1;
var comment_id_counter = 1;
const fs = require('fs')

function loadDatabase() {
    if(fs.existsSync('data.json')){
        var data = fs.readFileSync('data.json', 'utf-8');
        var jsonData = JSON.parse(data);
        posts = jsonData.posts;
        post_id_counter = jsonData.post_id_counter;
        comment_id_counter = jsonData.comment_id_counter

    }
}

loadDatabase()

function updateDatabase() {
    fs.writeFileSync(
        'data.json',
        JSON.stringify({ posts, post_id_counter, comment_id_counter }),
    )
}
function add({ title, description }) {
    var post = {
        id: post_id_counter,
        title: title,
        description: description,
        comments: []
    }
    posts.push(post);
    post_id_counter++;
    updateDatabase();
    return post
}

function list() {
    return posts
}

function getPostById(id) {
    var post = posts.find(post => post.id == id)
    return post
}

function deletePostById(id) {
    posts = posts.filter(post => post.id != id)
    return posts
}

function editPost({ id, title, description }) {
    var post = getPostById(id);
    if (!post) return undefined
    if (title) post.title = title;
    if (description) post.description = description;
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