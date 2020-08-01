# node-express-library
A demo application that integrates with GoodReads and uses Node, Express, SQL Server, and MongoDB.

Initial development completed by following the [Building Web Applications with Node.js and Express](https://app.pluralsight.com/library/courses/nodejs-express-web-applications-update/table-of-contents) Pluralsight course.

#### ESLint Rules Customization
``` javascript
rules: {
    'linebreak-style': ['error', 'windows'], // or unix
    indent: ['error', 4], // 4 spances, or 'tab'
}
```

#### Resources
- [npmrc](https://docs.npmjs.com/files/npmrc) - options for configuring NPM
- [ES Compatability](http://node.green) - gives a list of functionality supported by each ES version
- ESLint
    - [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Nodemon](https://nodemon.io) - gives hot reloading
- [Embedded Javascript Templates (EJS)](https://ejs.co/)
    - Used for inserting variables into HTML, similar to Razor, Vue, etc
- [EJS - Embedded JavaScript Templating](https://ejs.co/)
- [morgan](https://www.npmjs.com/package/morgan)
    - Middleware for writing out HTTP logging
- [mssql](https://www.npmjs.com/package/mssql) - package used to manage our connection and make database calls
- [mongodb](https://www.npmjs.com/package/mongodb) - package use to interact with MongoDB
- [body-parser](https://www.npmjs.com/package/body-parser) - used to handle form post data
- [passport](https://www.npmjs.com/package/passport) - handled user authentication
    - Uses different strategies for different types of authentication
        - Local Strategy - for local authentication
        - [List of Other Strategies](http://www.passportjs.org/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - manage cookies with passport
- [express-session](https://www.npmjs.com/package/cookieparser) - session management middleware for Express

#### MongoDB Queries
- Get all for collection: `db.#collection#.find().pretty()`
- Find one: `db.books.find({"title": "The Eye of the World"}).pretty()`
