
const calculateModel = require('../models/Calculator')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const ioBack = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

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
    const calculator = {
        calculator: '1',
        calculator: '5',
        calculator: '4',
        calculator: '4',
        calculator: '0',
        calculator: '0',
        calculator: '2',
        calculator: '26',
        calculator: '-2',
        calculator: '3',
        calculator: '4',
        calculator: '25',
        calculator: '2',
    }
    test("connect db", async () => {
        io.on('connection', (socket) => {
            calculateModel.find()
                .then((result) => {
                    socket.emit('output-history', result)
                    expect(result).toEqual(calculator)
                })
        });
    })
})

describe('server history', () => {
    const calculator = {
        calculator: '5'
    }
    test("history db", async () => {
        io.emit('history', calculator);
        io.once('history', (message) => {
            expect(message).toBe(calculator);
            done();
        });
        io.on('connection', (mySocket) => {
            expect(mySocket).toBeDefined();
        });
    })
})