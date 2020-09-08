const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');

const app = express();
const server = http.createServer(app);

//routes
const eventRoutes = require('./api/events/event.routes');
const userRoutes = require('./api/users/user.routes');

const PORT = process.env.PORT || 8001;

const sessionConfig = {
    secret: 'nobody-tosses%a.dwarf.!',
    name: 'monkey',
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
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



