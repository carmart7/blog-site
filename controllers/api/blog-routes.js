const router = require('express').Router();
const { Blog, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            text: req.body.text,
            title: req.body.title,
            user_id: req.body.user_id
        });

        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedBlog = await Blog.update({text: req.body.text, title: req.body.title}, {
            where: {
              id: req.body.id,
            }
        });

        res.status(200).json(updatedBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    res.status(200).json(await Blog.findAll({
        include: User
    }));
})

module.exports = router;