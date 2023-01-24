import express from 'express';

const app = express();

app.use('/', (req, res) => {
    return res.json("Hello from food order backend!!")
})

app.listen(5000, () =>{
    console.log('App is listening to the port 5000')
})
