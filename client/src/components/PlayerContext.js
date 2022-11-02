import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const PContext = createContext(null)

Array.min = function( array ){
  return Math.min.apply( Math, array );
};

const PlayerContext = ({ children }) => {

    const [ players, setPlayers ] = useState([])
    const [ lowestScore, setLowestScore ] = useState(0)

    useEffect(() => {
      axios.get('https://quizpinas2.herokuapp.com/quizpinas/')
        .then(response => {

          let arr = []
          setPlayers(response.data)

          response.data.find((p, i) => {
            arr.push(p.player_score)
          })

         setLowestScore(Array.min(arr))
        })
        .catch(err => {
          console.log("Error: ", err)
        })
    },[0])

  return (
    <PContext.Provider value={[ players, setPlayers, lowestScore ]}>
        {children}
    </PContext.Provider>
  )
}

export default PlayerContext