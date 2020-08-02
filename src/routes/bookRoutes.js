const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');
// const sql = require('mssql');

function router(nav) {
    const { getIndex, getById, middleware } = bookController(bookService, nav);

    bookRouter.use(middleware);

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);

    // SQL Version
    // bookRouter.route('/')
    //     .get((req, res) => {
    //         (async function query() {
    //             const request = new sql.Request();
    //             const { recordset } = await request.query('SELECT * FROM Books');

    //             debug(recordset);
    //             res.render(
    //                 'bookList',
    //                 {
    //                     nav,
    //                     title: 'Books',
    //                     books: recordset
    //                 }
    //             );
    //         }());
    //     });

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
