const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config()

const app = express();
const server = http.createServer(app);

//routes
const eventRoutes = require('./api/events/event.routes');
const userRoutes = require('./api/users/user.routes');

const PORT = process.env.PORT || 8001;

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    httpOnly: true,
    resave: false,
    saveUnitialized: false,
    cookie: {
        secure: false, //over https
        maxAge: 1000 * 60 * 10
    },

}

app.use(session(sessionConfig))
app.use(cors());
app.use(express.json());
app.use('/events', eventRoutes);
app.use('/users', userRoutes)
app.user('/', (req,res) => {
    res.send('helloooo')
})
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



