const express = require('express');

const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            title: 'The Eye of the World',
            genre: 'Fantasy',
            author: 'Jordan, Robert',
            read: true
        },
        {
            title: 'D-Day',
            genre: 'History',
            author: 'Beevor, Anthony',
            read: false
        },
        {
            title: 'Get Programming with F#',
            genre: 'Programming',
            author: 'Abraham, Isaac',
            read: false
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            res.render(
                'bookList',
                {
                    nav,
                    title: 'Books',
                    books
                }
            );
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'book',
                {
                    nav,
                    title: 'Books',
                    book: books[id]
                }
            );
        });

    return bookRouter;
}

module.exports = router;
