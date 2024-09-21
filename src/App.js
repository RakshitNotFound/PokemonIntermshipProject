// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch Pokemon data from API
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const results = response.data.results;
      // Fetch details for each Pokémon to get images
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        })
      );
      setPokemonList(pokemonDetails);
    };
    fetchPokemon();
  }, []);

  // Filter the Pokemon list based on the search term
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
