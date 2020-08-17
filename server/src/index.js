// library imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// custom imports
const {errorHandler, notFound} = require('./middleware/errorHandler.js')

const logsRouter = require('./api/logs');
// some configurations

dotenv.config();
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', ()=> console.log('database connected successfuly'));


app.get('/', (_req, res)=>{
    res.json({
        message: 'Hello world'
    });
});

app.use('/api/logs', logsRouter);


app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 1227;

app.listen(port, ()=> console.log(`server is listening on port ${port}`));
