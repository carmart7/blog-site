//require models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//establish relationship between models

//User-Blog relationship
User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Blog.belongsTo(User);

//User-Comment relationship
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User);

//Blog-Comment relationship
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog);

//export models to be used in api and 
module.exports = {
    User,
    Blog,
    Comment
}