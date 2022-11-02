import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Howl, Howler } from 'howler'

import { intro, end, mid2, tama, mali, departure, almost_end } from '../sounds'

import '../css/QuizApp.css'

function QuizApp({ done, questions }) {

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ correct, setCorrect ] = useState(0)
    const [ explanation, setExplanation ] = useState(false)
    const [ wrong, setWrong ] = useState(false)
    const [ finished, setFinished ]= useState(false)
    const [ currentAnswer, setCurrentAnswer ] = useState("")
    let timeout = null
    const Toast = withReactContent(Swal)
    var theme =   null
    var correct_not = null

    const onNext = ans => {
        if(ans){
            correct_not = new Howl({
                src: tama.url,
                html5: true,
                autoplay: true
            })
            setCorrect(correct + 1)
            correct_not.play()
        } else {
            setWrong(true)
            correct_not = new Howl({
                src: mali.url,
                html5: true,
                autoplay: true
            })
            correct_not.play()
        }
        setExplanation(true)

        if(currentQuestion === 49){
            let corrects = correct + (ans ? 1 : 0);
            done(corrects)
        } else {
            timeout = setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1)
                setExplanation(false)
                setWrong(false)

                // correct_not.stop()
            }, 5000)
        }
    }

    const skip = () => {
        clearTimeout(timeout)
        setExplanation(false)
        setWrong(false)
        setCurrentQuestion(currentQuestion + 1)
    }
    
    const forfeit = () => {
        Toast.fire({
            icon: 'question',
            text: 'Are you sure to give up?',
            confirmButtonText: 'Yes, I Give Up!',
            showCancelButton: true,
            cancelButtonText: 'Never',
            confirmButtonColor: '#000',
            iconColor: '#000'
        }).then(res => {
            clearTimeout(timeout)
            if(res.isConfirmed){
               return done(correct)
            } else {
                Toast.close()
            }
        })
    }

    useEffect(() => {
        questions[currentQuestion].answers.map(ans => {
            if(ans.isCorrect) {
                setCurrentAnswer(ans.answer)
            }
        })
    },[currentQuestion])

    useEffect(() => {
        theme= new Howl({
            src: intro.url,
            html5: true,
            autoplay: false,
            onloaderror:() => {
              Howler.stop()
              theme.play()
            },
            onend:()=>{
              theme = new Howl({
                src: mid2.url,
                autoplay: true,
                html5: true,
                onend:()=>{
                  theme = new Howl({
                    src: departure.url,
                    html5: true,
                    autoplay: true,
                    onend:()=>{
                      theme = new Howl({
                        src: almost_end.url,
                        html5: true,
                        autoplay: true,
                        onend:()=>{
                          theme = new Howl({
                            src: end.url,
                            html5: true,
                            autoplay: true,
                            onend:()=>{
                                setFinished(true)
                            }
                          }).play()
                        }
                      }).play()
                    }
                  }).play()
                }
              }).play()
            }
          })
          if(!finished) {
            theme.play()
          } else {
            setFinished(false)
          }
    },[finished])

    return (
        <>
        {
            explanation ?
            <div>
                <h2 className='text-center'>{ wrong ? "Wrong!": "Correct!"}</h2>
                <h5>Correct Answer: {currentAnswer}</h5>
                <h4>{questions[currentQuestion].explanation}</h4>
                <button className='skip-button' onClick={skip}>Skip</button>
                <div className='clearfix'></div>
            </div>
            :
            <div className ="question-box">
                {/* <span>Correct: {correct}</span> */}
                <h5>Question No. {currentQuestion + 1} out of 50</h5>
                <h4>{questions[currentQuestion].question}</h4>
                <div className ="answers-holder">
                {
                    questions[currentQuestion].answers.map((answers) =>{
                        return (
                            <button 
                                key = {Math.random()} 
                                className ="button-answers" 
                                onDoubleClick = {() => onNext(answers.isCorrect)}>
                                {answers.answer}
                            </button>
                        )
                    })
                }
                </div>
                <button className='forfeit-button' onClick={forfeit}>Give Up</button>
            </div>
        }
        <br/>
        {!explanation && <center><small>Double tap to confirm answer.</small></center>}
        </>
    )
} 

export default QuizApp  