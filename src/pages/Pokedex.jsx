import {
  IconArrowBigLeftLinesFilled,
  IconArrowBigRightLinesFilled,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderPokeball from "../components/pokedex/HeaderPokeball";
import PokemonList from "../components/pokedex/PokemonList";
import { paginateData } from "../constants/pagination";

function Pokedex() {
  const [pokemos, setPokemos] = useState([]);

  const [pokemonName, setPokemonName] = useState("");

  const [types, setTypes] = useState([]);

  const [currentType, setCurrentType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonByName = pokemos.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPage, lastPage, pagesInBlock } = paginateData(
    pokemonByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 7;
    if (newCurrentPage <= lastPage) setCurrentPage(newCurrentPage);
  };
  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 7;
    if (newCurrentPage >= 1) setCurrentPage(newCurrentPage);
  };

  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemos(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  // Busca todos types de pokemons para realizar el options
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) =>
          setPokemos(data.pokemon.map((pokemon) => pokemon.pokemon))
        )
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //! Resetea de pagina actual al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  return (
    <main className="bg-gradient-to-r  font-['Inter'] dark:bg-gray-900 dark:text-white h-screen overflow-y-scroll">
      <HeaderPokeball />
      <div className="max-w-7xl m-auto p-4 ">
        <section className="grid gap-4">
          <p className="text-2xl py-5">
            <span className="text-red-500">Welcome {trainerName}, </span>
            here you can find your favorite pokemon
          </p>

          <div className="flex flex-col gap-6 md:flex-row">
            <form
              onSubmit={handleSubmit}
              className="shadow-md md:w-[55%] text-2xl rounded-xl overflow-hidden"
            >
              <div>
                <input
                  className="w-[70%] h-16 px-4 outline-none dark:bg-black"
                  placeholder="Search pokemon..."
                  name="pokemonName"
                  type="text"
                />
                <button className="w-[30%] h-16 bg-red-500 hover:bg-red-900 transition-colors text-white ">
                  Search
                </button>
              </div>
            </form>
            <select
              onChange={handleChangeType}
              className="capitalize md:w-[40%] px-5 py-5 bg-white cursor-pointer shadow-lg rounded-xl overflow-hidden dark:bg-black"
            >
              <option className="text-center" value="">
                All pokemons
              </option>
              {types.map((pokemon) => (
                <option key={pokemon.url} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <PokemonList pokemos={itemsInCurrentPage} />
        {pokemos.length === 0 ? (
          <h3 className="text-center mt-20 text-3xl font-semibold">
            {
              "We are sorry, we didnot find any Pokémon with those characteristics"
            }
          </h3>
        ) : (
          <ul className="flex py-10 gap-5 justify-center items-center">
            {currentPage !== 1 && (
              <li>
                <button onClick={handlePreviusPage}>
                  {<IconArrowBigLeftLinesFilled />}
                </button>
              </li>
            )}
            {pagesInBlock.map((page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={` p-4 w-[50px] text-white rounded-md ${
                    currentPage === page ? "bg-red-500" : "bg-red-200"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            {currentPage !== lastPage && (
              <li>
                <button onClick={handleNextPage}>
                  {<IconArrowBigRightLinesFilled />}
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
}
export default Pokedex;
