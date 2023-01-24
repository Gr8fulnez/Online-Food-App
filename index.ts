import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose'
const mongoose = require("mongoose");

import { AdminRoute, VendorRoute } from './routes';
import { MONGO_URI } from './config';

const app = express();
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then((result:any) => {
    // console.log(result)
    console.log('DB connected')
}).catch((err:any) => console.log('error' + err))

app.listen(5000, () => {
    
    console.clear()
    console.log('App is listening to the port 5000')
})
