import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "./Components/Card";

export const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const { pageNumber } = useParams(); // Get page number from URL
  const currentPage = Number(pageNumber) || 1;

  const pageSize = 16;

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change

      const offset = (currentPage - 1) * pageSize;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
      );
      const detailedData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            img: pokeDetails.data.sprites.other.dream_world.front_default,
            abilities: pokeDetails.data.abilities,
            types: pokeDetails.data.types,
            moves: pokeDetails.data.moves,
            held_items: pokeDetails.data.held_items,
            forms: pokeDetails.data.forms,
          };
        })
      );
      setPokemonList(detailedData);
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setNotFound(false);

      navigate(`/page/${currentPage}`);

      const offset = (currentPage - 1) * pageSize;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
      );
      const detailedData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            img: pokeDetails.data.sprites.other.dream_world.front_default,
            abilities: pokeDetails.data.abilities,
            types: pokeDetails.data.types,
            moves: pokeDetails.data.moves.slice(0, 10),
            held_items: pokeDetails.data.held_items,
            forms: pokeDetails.data.forms,
          };
        })
      );
      setPokemonList(detailedData);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`
      );
      const pokemon = {
        name: res.data.name,
        img: res.data.sprites.other.dream_world.front_default,
        abilities: res.data.abilities,
        types: res.data.types,
        moves: res.data.moves.slice(0, 10),
        held_items: res.data.held_items,
        forms: res.data.forms,
      };
      setPokemonList([pokemon]);
      setNotFound(false);
    } catch (error) {
      setPokemonList([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) navigate(`/page/${currentPage - 1}`);
  };

  const handleNextPage = () => {
    navigate(`/page/${currentPage + 1}`);
  };

  return (
    <div className="p-4  bg-[url(https://i.redd.it/77g03lpc60a61.jpg)] bg-cover bg-center min-h-screen bg-fixed">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 rounded mb-4"
      />

      {loading ? (
        <p>Loading...</p>
      ) : notFound ? (
        <p className="text-red-500">No Pokémon found!</p>
      ) : (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {pokemonList.map((pokemon) => (
              <Card
                key={pokemon.name}
                name={pokemon.name}
                img={pokemon.img}
                abilities={pokemon.abilities}
                types={pokemon.types}
                moves={pokemon.moves}
                held_items={pokemon.held_items}
                forms={pokemon.forms}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!searchQuery && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-xl mx-2">{currentPage}</span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
