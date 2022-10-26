import React from 'react'

const AnswerButton = ({ onAnswer, answer }) => {
  
  return (
    <button className='button-answer' onDoubleClick={() => onAnswer(answer.isCorrect)}>
        {answer.answer}
    </button>
  )
}

export default AnswerButton