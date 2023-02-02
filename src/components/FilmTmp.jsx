import React from 'react'
import { Link } from 'react-router-dom'

import star from '../assets/star.png'
import '../styles/FilmTmp.css'

function FilmTmp(props) {
  const content = props.content
  
  return (
    <section className='section-film col'>
        <div>
            <img className='section-film-poster' src={props.image} alt='plakat'/>
        </div>
        <div className='section-film-description'>
            <h3>{props.title}</h3>
            <div className='section-film-star'><img style={{width: "25px", marginRight:"10px"}} src={star} alt="gwiazdka"/><p>Ocena</p></div>
            <Link to="/details" state={{content: content}}>Szczegóły</Link>
        </div>
    </section>
  )
}

export default FilmTmp