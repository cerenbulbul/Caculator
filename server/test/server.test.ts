
const calculateModel = require('../models/Calculator')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    rejectUnauthorized: false,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

beforeEach(() => {
    mongoose.connect("mongodb+srv://user:Password123@cluster0.vez7l.mongodb.net/History?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})

describe('server connection', () => {
    it("connect db", async () => {
        io.on('connection', (socket) => {
            calculateModel.find()
                .then((result) => {
                    socket.emit('output-history', result)
                    expect(result).toEqual({
                        calculator: '5',
                    })
                })
        });   
    })
})

describe('server history', () => {
    it("history db", async () => {
        io.on('history', (socket) => {
            socket.on('history', calculator => {
                const calculation = new calculateModel({ calculator });
                const cal = calculation.save().then(() => {
                    io.emit('history', calculator)
                    
                })
                expect(cal).toEqual({
                    calculator: calculator,
                })
            })
        });   
    })
})