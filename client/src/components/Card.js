import React from 'react'

import '../css/Card.css'

function Card({ children }) {
  return (
    <div className='gamecard'>
        {children}
    </div>
  )
}

export default Card