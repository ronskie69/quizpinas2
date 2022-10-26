import React from 'react'

const FrontPage = ({ onSetPage }) => {
  return (
    <div>
        <h2>Hello and Welcome to Quiz Pinas 2!</h2>
        <center>
          <button type="button" onClick={() => onSetPage(1)}>Start Game</button>
          <button type="button" onClick={() => onSetPage(4)} style={{ marginLeft: '10px'}}>View Rankings</button>
        </center>
    </div>
  )
}

export default FrontPage