const app = require('express').Router()
const Quiz = require('../models/QuizModel')


app.get('/', (req, res) => {
    Quiz.find({})
        .sort({ 'player_score': 'desc' })
        .limit(10)
        .then(players => {
            res.json(players)
        })
        .catch(err => {
            res.send("error")
        })
})

app.post('/add', (req, res) => {
    const { player_name, player_score, player_id } = req.body

    const newRank = new Quiz({
        player_name, player_id, player_score
    })

    try {
        newRank.save()
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = app