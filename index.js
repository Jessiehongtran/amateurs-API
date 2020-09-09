const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
require('dotenv').config()

const app = express();
const server = http.createServer(app);

const db = require('./database/dbConfig');

//routes
const eventRoutes = require('./api/events/event.routes');
const userRoutes = require('./api/users/user.routes');

const PORT = process.env.PORT || 8001;

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUnitialized: false,
    cookie: {
        secure: app.get('env') === 'production', //over https
        maxAge: 1000 * 60 * 10,
        httpOnly: true
    },
    store: new KnexSessionStore({
        tablename: 'session',
        sidfieldname: 'sid',
        knex: db,
        createtable: true,
        clearInterval: 1000 * 60 * 60  //removes only expired
    })
}

var originList = ['http://localhost:3000', 'https://amateurs.vercel.app']

const corsConfig = {
    credentials: true,
    origin: function (origin, callback) {
        if (originList.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}


app.use(session(sessionConfig))
app.use(cors(corsConfig));
app.use(express.json());
app.use('/events', eventRoutes);
app.use('/users', userRoutes)
app.use('/', (req,res) => {
    res.send('helloooo')
})
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



