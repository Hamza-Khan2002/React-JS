import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PokemonDetail = ({typeColor}) => {
  
  
  const params = useParams()
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const API = `https://pokeapi.co/api/v2/pokemon/${params.id}`

  useEffect(() =>{
      const fetchPokemon = async() =>{
          const response = await axios.get(API)
          const pokemonData = response.data

          setPokemonDetail(pokemonData)            
      }
      fetchPokemon();
  }, [params.id])

  if(!pokemonDetail) return <p className='text-white text-center translate-y-50 text-2xl'>Loading....</p>

  return (
    <div className='h-full px-4'>
        <div className='lg:h-110 lg:w-300 border-2 border-white mt-30 overflow-hidden lg:ml-19 text-white p-3 lg:p-6'>
        <img className='h-40 lg:h-1/2 float-left mr-20'
        src={pokemonDetail.sprites.front_default} alt="" />

        <div>
        <h1 className='text-white flex justify-center -translate-x-20 text-xl lg:text-4xl font-extrabold mb-4 capitalize'>{pokemonDetail.name}</h1>

        <h1 className='text-sm mb-1'>Pokedex #: {pokemonDetail.id}</h1>

        <h1 className='text-white font-semibold text-[0.8em] mt-1'>Type: {pokemonDetail.types.map((e, idx) => 
          <span key={idx} className={`${typeColor[e.type.name]} px-3 rounded ml-2 text-white`}>{e.type.name}</span>)}
        </h1>

        <h1 className='text-sm mb-1'>Base Experience: {pokemonDetail.base_experience}</h1>
        <h1 className='text-sm mb-1'>Height: {pokemonDetail.height}</h1>
        <h1 className = 'text-sm mb-1'>Moves: {pokemonDetail.moves.length}</h1>
        </div>

        <div className='mt-10 text-center text-sm'>
          <ul className='grid grid-flow-row grid-cols-2 gap-y-1 border-2 border-white'>
            <li className='border-b-2 border-white font-semibold'>Name</li>
            <li className='border-b-2 border-white font-semibold'>Stats</li>
            {pokemonDetail.stats.map((e, idx) =>{
                return (
                  <React.Fragment key={idx}>
                    <li className='mb-1 capitalize'>{e.stat.name}</li>
                    <li className='mb-1'>{e.base_stat}</li>
                  </React.Fragment>
                )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default PokemonDetail