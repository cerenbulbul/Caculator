const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http, {
    rejectUnauthorized: false,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

require("dotenv").config();
const calculateModel = require('./models/Calculator')
const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb+srv://user:Password123@cluster0.vez7l.mongodb.net/History?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
catch (err) {
    console.log('connection mango failded')
}


io.on('connection', (socket) => {
    calculateModel.find().then(result => {
        socket.emit('output-history', result)
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('history', calculator => {
        const message = new calculateModel({ calculator });
        message.save().then(() => {
            io.emit('history', calculator)
        })


    })
});


app.get('/', async (req, res) => {
    const calc = new calculateModel({ calculator: '5' })

    try {
        //await calc.save();
        console.log('get')
    }
    catch (err) {
        console.log('get failed')
    }
})

http.listen(3001, () => {
    console.log(`Listening on port 3001!`);
});