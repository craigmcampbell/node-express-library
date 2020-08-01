const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            const { email, password } = req.body;

            debug(req.body);

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { email, password };

                    const results = await col.insertOne(user);

                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
            }());
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Log In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    return authRouter;
}

module.exports = router;
