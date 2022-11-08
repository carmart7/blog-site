const router = require('express').Router();
const { User, Blog } = require('../../models');

router.post('/', async (req, res) => {
    //create a new user with username and password
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password //this will be hashed before it is added to the table
        });
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = newUser.id;
            res.status(200).json(newUser);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userFound = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userFound) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const userPassCheck = await userFound.checkPassword(req.body.password);

        if (!userPassCheck) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userFound.id;
            res.status(200).json({ user: userFound, message: 'You are now logged in!' });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', async (req, res) => {
    //destroy the req.session with req.session.destroy(callback) to get rid of the cookie on the users side
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/', async (req, res) => {
    res.status(200).json(await User.findAll({
        include: Blog
    }));
});

module.exports = router;