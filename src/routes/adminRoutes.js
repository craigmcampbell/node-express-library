const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
    {
        title: 'The Eye of the World',
        genre: 'Fantasy',
        author: 'Jordan, Robert',
        bookId: 228665,
        hasRead: true
    },
    {
        title: 'Get Programming with F#',
        genre: 'Technical',
        author: 'Abraham, Isaac',
        bookId: 40617290,
        hasRead: false
    },
    {
        title: 'D-Day',
        genre: 'History',
        author: 'Beevor, Antony',
        bookId: 7939062,
        hasRead: false
    }
];

function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected to mongodb');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
            }());
        });

    return adminRouter;
}

module.exports = router;
