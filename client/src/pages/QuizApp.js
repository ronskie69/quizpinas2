import React, { useState, useEffect, useRef } from 'react'

import '../css/QuizApp.css'

function QuizApp({ done, questions }) {

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ correct, setCorrect ] = useState(0)
    const [ explanation, setExplanation ] = useState(false)
    const [ wrong, setWrong ] = useState(false)
    let timeout = null

    const onNext = ans => {
        if(ans){
            setCorrect(correct + 1)
        } else {
            setWrong(true)
        }
        setExplanation(true)

        if(currentQuestion < questions.length-1){
            timeout=setTimeout(() => {
                setExplanation(false)
                setWrong(false)
                setCurrentQuestion(currentQuestion + 1)
            }, 5000)
        } else {
            let corrects = correct + (ans ? 1 : 0);
            done(corrects)
        }
    }

    const skip = () => {
        clearTimeout(timeout)
        setExplanation(false)
        setWrong(false)
        setCurrentQuestion(currentQuestion + 1)
    }

    return (
        <>
        {
            explanation ?
            <div>
                <h3 className='text-center'>{ wrong ? "Wrong!": "Correct!"}</h3>
                <h4>{questions[currentQuestion].explanation}</h4>
                <button className='skip-button' onClick={skip}>Skip</button>
                <div className='clearfix'></div>
            </div>
            :
            <div className ="question-box">
                <span>Correct: {correct}/{questions.length}</span>
                <h5>Question No. {currentQuestion + 1}</h5>
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
                <button className='forfeit-button' onClick={() => done(correct)}>Give Up</button>
            </div>
        }
        </>
    )
} 

export default QuizApp  