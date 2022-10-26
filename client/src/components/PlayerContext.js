import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const PContext = createContext(null)

const PlayerContext = ({ children }) => {

    const [ players, setPlayers ] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3002/quizpinas/')
        .then(response => {
          setPlayers(response.data)
        })
        .catch(err => {
          console.log("Error: ", err)
        })
    },[0])

  return (
    <PContext.Provider value={[ players, setPlayers ]}>
        {children}
    </PContext.Provider>
  )
}

export default PlayerContext