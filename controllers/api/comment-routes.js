const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    res.status(200).json(await Comment.findAll({
        include: [User, Blog]
    }));
})

module.exports = router;