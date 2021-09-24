   
const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    calculation: {
        type: String,
        required: true
    }
})

const History = mongoose.model('calculation', historySchema);
module.exports = History;