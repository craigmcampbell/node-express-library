const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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
    { link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
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
