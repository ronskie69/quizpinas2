import React, { useContext } from 'react'
import { PContext } from '../components/PlayerContext'
import { FaMedal } from 'react-icons/fa'

import '../css/Rankings.css'

const Rankings = ({ page }) => {

  const [ players ] = useContext(PContext)

  return (
    <div className='rankings'>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {
          players.length > 0 ?
          players.sort((a, b) => b.player_score - a.player_score)
          .map((player, i) => {
            return <tr key={i}>
              <td>{i==0&&<FaMedal style={{ marginRight: '5px'}}/>}{i+1}</td>
              <td>{player.player_name}</td>
              <td>{player.player_score}</td>
            </tr>
          })
          : <tr><td colSpan="3" style={{ textAlign: 'center'}}>No players in the rankings yet.</td></tr>
        }
        </tbody>
      </table>
      <button className='home' onClick={() => page(0)}>Home</button>
    </div>
  )
}

export default Rankings