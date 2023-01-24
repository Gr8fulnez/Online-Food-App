import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

import { AdminRoute, VendorRoute } from './routes';

const app = express();
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)

app.listen(5000, () => {
    
    console.clear()
    console.log('App is listening to the port 5000')
})
