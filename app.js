const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Set up SqlServer
const config = {
    user: '',
    password: '',
    server: '', // You can use 'localhost\\instance' to connect to named instance
    database: 'Library',

    options: {
        encrypt: true, // Use this if you are on Azure
        enableArithAbort: true
    }
};

// sql.connect(config).catch((err) => (debug(err)));

// Middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

// Configuration
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Navigation/Routing
const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' },
    { link: '/admin', title: 'Admin' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render(
        'index',
        {
            nav,
            title: 'Library'
        }
    );
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
