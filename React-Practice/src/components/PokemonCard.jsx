import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {ChevronRight, ChevronLeft} from 'lucide-react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'

const PokemonCard = ({pokemon, setPokemon, typeColor, search, searchData}) => {

    const [page, setPage] = useState(1)
    const limit = 10
    const offset = (page-1)*limit
    const API = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const currentPage = params.pageNumber?parseInt(params.pageNumber) : 1;
    
    useEffect(() =>{
        const fetchPokemon = async() =>{
            const response = await axios.get(API)
            const pokemonData = response.data.results
            
            const allPokemon = await Promise.all(pokemonData.map(async (e) =>{
                const resp = await axios.get(e.url)
                return resp.data   
            }))
            setPokemon(allPokemon)            
        }
        fetchPokemon();
    }, [page])

    useEffect(() =>{
        setPage(currentPage)
    }, [currentPage])  
    
    const displayPokemon = search ? searchData : pokemon

    return (
    <div className='flex justify-between items-center pt-20'>
        {!search &&(<div>
            <button disabled = {page==1} onClick={() => {
                setPage(page-1)
                const prev = currentPage-1
                if(prev >=1){
                    navigate(prev === 1 ? '/' : `/${prev}`)
                }
            }}
            className='cursor-pointer active:scale-95'>
                <ChevronLeft size={80} color='#ffffff'/>
            </button>
        </div>)}

        <div className='flex lg:flex-wrap px-6 lg:px-4 justify-center items-center gap-x-10'>
            {displayPokemon.map((e) =>{
                return (<Link key = {e.id} to={`/pokemon/${e.id}`} state = {{from: location.pathname}}>
                    <div 
                    className='h-100 w-60 lg:h-60 lg:w-50 mt-10 border-2 border-white rounded-2xl bg-transparent p-2 text-lg lg:text-[0.7em]'>
                        <img className='h-60 lg:h-35 w-full object-contain'
                        src={e.sprites.front_default} alt="" />

                        <h1 className='text-white font-semibold mt-3'>ID #: {e.id}</h1>
                        <h1 className='text-white font-semibold capitalize'>Name: {e.name}</h1>
                        <h1 className='text-white font-semibold text-[0.8em] mt-1'>Type: {e.types.map((e, idx) => 
                            <span key={idx} className={`${typeColor[e.type.name]} px-2 rounded ml-2 text-white`}>{e.type.name}</span>)}
                        </h1>
                            
                    </div>
                </Link>)
            })}
        </div>

        {!search && (<div>
            <button onClick={() =>{
                setPage(page+1)
                navigate(`/${currentPage+1}`)
            }} 
            className='cursor-pointer active:scale-95'>
                <ChevronRight size={80} color='#ffffff'/>    
             </button>
        </div>)}
    </div>
  )
}

export default PokemonCard
