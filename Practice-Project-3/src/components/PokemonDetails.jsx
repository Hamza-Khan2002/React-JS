import React from 'react'

const PokemonDetails = (props) => {
  return (
    <div className='h-20 w-full text-white px-2 py-2 capitalize'>
        <h1>PokedexID: {props.id}</h1>
        <h1>Pokemon: {props.name}</h1>
    </div>
  )
}

export default PokemonDetails