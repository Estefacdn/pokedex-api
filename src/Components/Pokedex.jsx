import React, { useEffect, useState } from 'react'
import PokemonThumnail from './PokemonThumnail'

const Pokedex = () => {

    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=5')

    const getAllPokemos = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)
        

        function createPokemonObject(results)  {
            results.forEach( async pokemon => {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              const data =  await res.json()
              setAllPokemons( currentList => [...currentList, data])
              allPokemons.sort((a, b) => a.id - b.id)
            })
          }

        createPokemonObject(data.results)
    }

    useEffect(() => {
        getAllPokemos()
    }, [])

    return (
        <div className='app-container'>

            <div className='pokemon-container'>
                <div className='all-container'>
                    {allPokemons.map((pokemon, index) =>
                        <PokemonThumnail
                            
                            key={index}
                            id={pokemon.id}
                            name={pokemon.name }
                            image={pokemon.sprites.other.dream_world.front_default}
                            type={pokemon.types[0].type.name}
                            
                        />   
                    )}
                </div>
                <button className='load-more' onClick={()=> getAllPokemos()} >Load More</button>
            </div>
        </div>
    )
}

export default Pokedex