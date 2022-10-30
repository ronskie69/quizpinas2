import React, { useEffect } from 'react'
import { Howler, Howl} from 'howler'
import '../css/FrontPage.css'
import { upuan, tatsulok, pinoy_ako} from '../sounds'

const FrontPage = ({ onSetPage }) => {

  let bg = null

  useEffect(() => {
    Howler.stop()

    bg = new Howl({
      src: [pinoy_ako.url, tatsulok.url ],
      autoplay: true,
      preload:true,
      onloaderror:() => {
        Howler.stop()
        bg.play()
      }
    })
  })
  return (
    <div>
        <img src={require('../img/quizpinas2-nogbg.png')}/>
        <p className='text-center'>Get Ready to new Challenges!</p>
        <center>
          <button type="button" onClick={() => onSetPage(1)}>Start Game</button>
          <button type="button" onClick={() => onSetPage(4)} style={{ marginLeft: '10px'}}>View Rankings</button>
        </center>
    </div>
  )
}

export default FrontPage