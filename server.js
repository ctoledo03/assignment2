import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
//useCreateIndex: true, 
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => {console.log("Connected to the database!");})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})

app.get("/", (req, res) => {
    // res.json({ message: "Welcome to User application." });
    res.setHeader('Content-Type', 'text/plain');
    res.end('App2 has started');
});

app.listen(config.port, (err) => { 
    if (err) {
    console.log(err) 
    }
    console.info('Server started on port %s.', config.port) 
})


