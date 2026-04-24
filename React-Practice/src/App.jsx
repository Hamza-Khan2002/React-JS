import React, {useEffect, useState} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import Header from './components/Header'
import PokemonCard from './components/PokemonCard'
import PokemonDetail from './components/PokemonDetail'
import axios from 'axios'

const App = () => {
  
  const [allPokemon, setAllPokemon] = useState([])
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState("")
  const allAPI = "https://pokeapi.co/api/v2/pokemon?limit=1300"

  const typeColor = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    bug: 'bg-lime-500',
    normal: 'bg-gray-400',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    fairy: 'bg-pink-400',
    fighting: 'bg-orange-700',
    psychic: 'bg-pink-600',
    rock: 'bg-gray-700',
    ghost: 'bg-indigo-700',
    ice: 'bg-cyan-200',
    dragon: 'bg-indigo-500',
    flying: 'bg-sky-300',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500'
    }  
  
useEffect(() =>{
  const fetchAllPokemon = async () =>{
    const response = await axios.get(allAPI)
    const pokemonData = response.data.results
  
    const allPokemonData = await Promise.all(pokemonData.map(async (e) =>{
      const res = await axios.get(e.url)
      return res.data
    }))
    setAllPokemon(allPokemonData)
  }
  fetchAllPokemon()
},[])


const searchData = allPokemon.filter((currPokemon) =>{
  return (currPokemon.name.toLowerCase().includes(search.toLowerCase()))
})

  return (
    <div id='head'
    className='min-h-screen bg-black overflow-auto'>
      <Header search = {search} setSearch = {setSearch}/>
      <Routes>
        <Route path='/' element = {<PokemonCard pokemon = {pokemon} setPokemon = {setPokemon} typeColor = {typeColor} search = {search} searchData = {searchData}/>} />
        <Route path='/:pageNumber' element = {<PokemonCard pokemon = {pokemon} setPokemon = {setPokemon} typeColor = {typeColor} search = {search} searchData = {searchData}/>} />
        <Route path='/pokemon/:id' element = {<PokemonDetail pokemon = {pokemon} typeColor = {typeColor}/>}/>
      </Routes>    
    </div>
  )
}

export default App
