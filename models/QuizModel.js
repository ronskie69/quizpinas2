const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    player_name: { type: String, required: true },
    player_id: { type: String, required: true, default: ""+Date.now()},
    player_score: { type: Number, required: true },
})

const Quiz = mongoose.model('QuizPinas2', QuizSchema)

module.exports = Quiz