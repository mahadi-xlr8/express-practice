const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const debug=require('debug')('app:debug')
const genres=require('./routes/genres')

const logger=require('./logger')

app.use(logger.logger)

app.use(logger.auth)

app.use(express.urlencoded({extended:true}))


app.use('/api/genres',genres)



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));
