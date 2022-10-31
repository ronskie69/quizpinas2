import React, { useContext, useState } from 'react'
import { PContext } from '../components/PlayerContext'
import { FaSmileWink, FaSadCry } from 'react-icons/fa'
import { v4 } from 'uuid'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../css/LastPage.css'
import '../css/AnswerButton.css'

import axios from 'axios'
import { useEffect } from 'react'
import { Howl, Howler} from 'howler'
import { tapos_na } from '../sounds'

const LastPage = ({ score, next }) => {

    const [ playerName, setPlayerName ] = useState("")
    const [ players, setPlayers ] = useContext(PContext)

    const Toaster = withReactContent(Swal)

    var bg = null
    var swal = null

    const iconStyle = {
        color: '#edac1a',
        zoom: '1.4'
    }

    const submitScore = async (e) => {
        e.preventDefault()

        if(playerName.length > 9){
            return Toaster.fire({ text: 'Nickname too long!', icon: 'error', iconColor: '#000', confirmButtonColor: '#000',cancelButtonText: 'Okay' })
        }
        let newPlayer = {
            player_name: playerName,
            player_id: v4(),
            player_score: score
        }

        let checkExisting = players.find(p=>p.player_name == playerName)

        if(!checkExisting || checkExisting.length == 0){
            if(score >= 25){

                Swal.fire({
                    icon: 'info',
                    text: 'Please wait...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    iconColor: '#000',
                    showConfirmButton: false,
                });


                try {

                    await axios.post('https://quizpinas2.herokuapp.com/quizpinas/add', newPlayer)

                    window.location.reload()

                } catch(err) {
                    window.location.reload()
                }
            } 
        } else {
            return Toaster.fire({ text: 'Player already exists!', icon: 'error', confirmButtonColor: '#000',cancelButtonText: 'Okay'})
        }
    }

    useEffect(() =>{
        Howler.stop()

        bg = new Howl({
            src: tapos_na.url,
            loop: true,
            autoplay: true,
            onloaderror: (e,r) => {
                console.log(e,r)
                Howler.stop()
                bg.play()
            }
        })

    },[0])


  return (
    <div className='last-page'>
        <h4>{score >= 25 ? 'Congratulations!' : 'Quiz Finished!'}</h4>
        <p>
            Your score is {score} out of 50!
            &nbsp;&nbsp;{ score >= 25 ? <FaSmileWink style={iconStyle}/>:<>
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