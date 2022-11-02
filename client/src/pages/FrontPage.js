import React, { useEffect } from 'react'
import { Howler, Howl} from 'howler'
import '../css/FrontPage.css'
import { upuan, tatsulok, pinoy_ako, ph} from '../sounds'

const FrontPage = ({ onSetPage }) => {

  let bg = null


  useEffect(() => {
    Howler.stop()

    bg = new Howl({
      src: ph.url,
      autoplay: true,
      onloaderror:() => {
        Howler.stop()
        bg.play()
      },
      onend:()=>{
        bg = new Howl({
          src: pinoy_ako.url,
          autoplay: true,
          onend:()=>{
            bg = new Howl({
              src: upuan.url,
              autoplay: true,
              onend:()=>{
                bg = new Howl({
                  src: tatsulok.url,
                  autoplay: true,
                  onend:()=>{
                    bg = new Howl({
                      src: upuan.url,
                      autoplay: true,
                      onend:()=>{
                       Howler.stop()
                       bg.play()
                      }
                    }).play()
                  }
                }).play()
              }
            }).play()
          }
        }).play()
      }
    }).play()

    return () => Howler.stop()
  },[0])
  return (
    <div>
        <img src={require('../img/quizpinas2-nogbg.png')}/>
        <p className='text-center'>Get Ready to the new Challenges!</p>
        <center>
          <button type="button" onClick={() => onSetPage(1)}>Start Game</button>
          <button type="button" onClick={() => onSetPage(4)} style={{ marginLeft: '10px'}}>View Rankings</button>
        </center>
    </div>
  )
}

export default FrontPage