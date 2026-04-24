import React from 'react'

const PokemonImage = (props) => {
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
  
  return (
    <div className='h-40 w-full overflow-hidden py-3 px-5 border-b-white border-3'>
        <img src={imageUrl} alt="" 
        className='h-full w-full object-contain bg-black'/>
    </div>
  )
}

export default PokemonImage