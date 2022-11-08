const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const middleAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const blogData = await Blog.findAll({include: User});
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
        blogs,
        loggedIn: req.session.loggedIn,
        pageName: 'The Tech Blog'
    });
});

router.get('/login', async (req, res) => {
    res.render('login', {
        pageName: 'The Tech Blog'
    });
});

router.get('/signup', async (req, res) => {
    res.render('signup', {
        pageName: 'The Tech Blog'
    });
});

router.get('/dashboard', middleAuth, async (req, res) => {
    const blogData = await Blog.findAll({
        where: {
            user_id: req.session.userId
        },
        include: User
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', {
        blogs,
        loggedIn: req.session.loggedIn,
        pageName: 'Your Dashboard' 
    });
});

router.get('/dashboard/edit/:id', middleAuth, async (req, res) => {
    const blogData = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: User
    });
    const blog = blogData.get({ plain: true });
    res.render('edit', {
        blog,
        loggedIn: req.session.loggedIn,
        pageName: 'Your Dashboard' 
    });
});

router.get('/dashboard/create', middleAuth, async (req, res) => {
    res.render('create', {
        loggedIn: req.session.loggedIn,
        pageName: 'Your Dashboard' 
    });
});

router.get('/blog/:id', middleAuth, async (req, res) =>{
    const blogData = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [User, { model: Comment, include: User}]
    });
    const blog = blogData.get({ plain: true });
    const comments = blog.comments;
    res.render('blog', {
        blog,
        comments,
        loggedIn: req.session.loggedIn,
        pageName: 'Your Dashboard' 
    });
});

module.exports = router;