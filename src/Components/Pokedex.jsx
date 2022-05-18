import React, { useEffect, useState } from 'react'
import PokemonThumnail from './PokemonThumnail'

const Pokedex = () => {

    const [allPokemos, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

    const getAllPokemos = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()

                setAllPokemons(currentList => [...currentList, data])
            });
        }

        createPokemonObject(data.result)
    }

    useEffect(() => {
        getAllPokemos()
    }, [])

    return (
        <div className='app-container'>

            <div className='pokemon-container'>
                <div className='all-container'>
                    {allPokemos.map((pokemon, index) =>
                        <PokemonThumnail
                            id={pokemon.id}
                            name={pokemon.name }
                            image={pokemon.sprite.other.dream_world.front_default}
                            type={pokemon.types[0].type.name}
                            key={index}
                        />   
                    )}
                </div>
                <button className='load-more'>Load More</button>
            </div>
        </div>
    )
}

export default Pokedex