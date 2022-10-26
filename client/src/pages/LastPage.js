import React, { useContext, useState } from 'react'
import { PContext } from '../components/PlayerContext'
import { FaSmileWink, FaSadCry } from 'react-icons/fa'
import { v4 } from 'uuid'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../css/LastPage.css'
import '../css/AnswerButton.css'

import axios from 'axios'

const LastPage = ({ score, next, questLength }) => {

    const [ playerName, setPlayerName ] = useState("")
    const [ players, setPlayers ] = useContext(PContext)

    const Toaster = withReactContent(Swal)

    const iconStyle = {
        color: '#edac1a',
        zoom: '1.4'
    }

    const submitScore = (e) => {
        e.preventDefault()

        if(playerName.length > 10){
            return Toaster.fire({ text: 'Nickname too long!', icon: 'error', confirmButtonColor: '#000',cancelButtonText: 'Okay' })
        }
        let newPlayer = {
            player_name: playerName,
            player_id: v4(),
            player_score: score
        }

        let checkExisting = players.find(p=>p.player_name == playerName)

        if(!checkExisting || checkExisting.length == 0){
            if(score >= 25){
                axios.post('http://localhost:3002/quizpinas/add', newPlayer)
                    .then(() => {
                        setPlayers([...players, newPlayer])
                    })
                    .catch(err => console.log("Error", err))
            } 
        } else {
            return Toaster.fire({ text: 'Player already exists!', icon: 'error', confirmButtonColor: '#000',cancelButtonText: 'Okay'})
        }
        next(4)
    }


  return (
    <div className='last-page'>
        <h4>Quiz Finished!</h4>
        <p>
            Your score is {score} out of {questLength}!
            &nbsp;&nbsp;{ score > 25 ? <FaSmileWink style={iconStyle}/>:<>
            <FaSadCry style={iconStyle}/> <p>You failed to be in the rankings.</p>
            </>}
        </p>
        {
            score > 25 ?
            <div className='form-group'>
                <form onSubmit={submitScore} action="POST">
                    <input 
                        className='form-input' 
                        value={playerName}
                        placeholder="Write your name here..."
                        onChange={(e) => setPlayerName(e.target.value)}
                        name="playerName"/>
                    <button className ='submit-button'>Submit</button>
                </form>
            </div>
            :
            <>
            <button type="button" className='home-button' onClick={() => next(0)}>Home</button>
            <div className='clearfix'></div>
            </>
        }
    </div>
  )
}

export default LastPage