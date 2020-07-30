const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();
const sql = require('mssql');

function router(nav) {
    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                // const request = new sql.Request();
                // const { recordset } = await request.query('SELECT * FROM Books');

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

                // SQL Version
                // debug(recordset);
                // res.render(
                //     'bookList',
                //     {
                //         nav,
                //         title: 'Books',
                //         books: recordset
                //     }
                // );
            }());
        });

    // MongoDB Version
    bookRouter.route('/:id')
        .get((req, res) => {
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
        });

    // SQL Version
    // bookRouter.route('/:id')
    //     .all((req, res, next) => {
    //         const { id } = req.params;

    //         (async function query() {
    //             const request = new sql.Request();
    //             const { recordset } = await request.input('id', sql.Int, id)
    //                 .query('SELECT * FROM Books WHERE Id = @id');

    //             [req.book] = recordset;
    //             next();

    //             debug(recordset);
    //         }());
    //     })
    //     .get((req, res) => {
    //         res.render(
    //             'book',
    //             {
    //                 nav,
    //                 title: 'Books',
    //                 book: req.book
    //             }
    //         );
    //     });

    return bookRouter;
}

module.exports = router;
