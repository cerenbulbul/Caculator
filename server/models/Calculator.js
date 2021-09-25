const mongoose = require('mongoose')

const CalculatorSchema = new mongoose.Schema({
    calculator: {
        type: String,
        required: true
    }
})

const Calculator = mongoose.model("Calculator", CalculatorSchema)
module.exports = Calculator;