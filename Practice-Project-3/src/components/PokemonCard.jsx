import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonImage from './PokemonImage'
import PokemonDetails from './PokemonDetails'

const PokemonCard = () => {
    
    const [userData, setUserData] = useState([])
    const [page, setPage] = useState(1)
    const limit = 10

    const Prev = () =>{
        if(page>1){
            setPage(page-1)
        }
    }
    
    const Next = () =>{
        setPage(page+1)
    }

    useEffect(() =>{

        const fetch =  async () =>{

            const offset = (page-1)*limit
            const api = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`

            const response = await axios.get(api)
            setUserData(response.data.results)
        }

        fetch()
    }, [page])
  
    return (
        <div className='flex flex-wrap lg:flex-row flex-col gap-12 overflow-hidden justify-center'>
        {userData.map((elem, idx) =>{

            const pokemonId = (page-1)*limit+idx+1

           return (
           <div key = {pokemonId}
            className='h-60 w-50 rounded-2xl border-3 border-white'>
            <PokemonImage id = {pokemonId}/>
            <PokemonDetails name = {elem.name} id = {pokemonId}/>
           </div>
        )})}
        <button onClick={Prev} disabled = {page==1}
        className='bg-amber-500 py-2 px-8 cursor-pointer active:scale-95 rounded disabled:opacity-50'>Prev</button>
        <h1 className = "text-white font-extrabold text-2xl">{page}</h1>
        <button onClick={Next}
        className='bg-amber-500 py-2 px-8 cursor-pointer rounded active:scale-95'>Next</button>
    </div>
  )
}

export default PokemonCard