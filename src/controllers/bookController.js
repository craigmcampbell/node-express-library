const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //     res.redirect('/');
    // }
}

function bookController(bookService, nav) {
    function getIndex(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('connected to mongodb');

                const db = client.db(dbName);

                const col = await db.collection('books');
                const books = await col.find().toArray();

                // MongoDB Version
                res.render(
                    'bookList',
                    {
                        nav,
                        title: 'Books',
                        books
                    }
                );
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    }

    function getById(req, res) {
        (async function query() {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected to mongodb');

                    const db = client.db(dbName);

                    const col = await db.collection('books');

                    const book = await col.findOne({ _id: new ObjectID(id) });

                    book.details = await bookService.getBookById(book.bookId);

                    // MongoDB Version
                    res.render(
                        'book',
                        {
                            nav,
                            title: 'Books',
                            book
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
            }());
        }());
    }

    // Revealing module pattern
    return {
        middleware,
        getIndex,
        getById
    };
}

module.exports = bookController;
