const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const express = require('express');
let session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlServer = require('./graphql')


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// store configuration
let memoryStore = new session.MemoryStore();
app.use(session({
    secret: process.env.APP_SECRET || '1996',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// custom -> start apollo server
async function startApolloServer() {
    await graphqlServer.start();
    graphqlServer.applyMiddleware({app});
}

startApolloServer().then(r => console.log(`GraphQL now served at : ${graphqlServer.graphqlPath}`)).catch(err=>{
    console.log(`Encountered an error when starting graphql server : ${err.message}`)
    graphqlServer.graphqlPath = '/graphql'
})
// redirect to graphql server if home is visited...
app.get('/', (req, res) => {
    res.status(200).redirect(graphqlServer.graphqlPath)
})

// keycloak
if(process.env.KEYCLOAK_STATUS && process.env.KEYCLOAK_STATUS === 'enabled') {// keycloak config and init
    const keycloak = require('./components/commons/auth/keycloak').initKeycloak(memoryStore)
    app.use(graphqlServer.graphqlPath, keycloak.middleware())
    app.use(graphqlServer.graphqlPath, keycloak.protect())
}
//

module.exports = app;
