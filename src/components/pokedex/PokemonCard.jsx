import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType } from "../../constants/pokemonTypes";

function PokemonCard({ pokemonURL }) {
  const [pokemon, setPokemon] = useState(null);

  const types = pokemon?.types.map((type) => type.type.name).join(" / ");

  const ByType= [pokemon?.types[0].type.name]

  useEffect(() => {
    axios
      .get(pokemonURL)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className="capitalize py-8 hover:-translate-y-7 transition-all">
      <section className={`border-[12px] rounded-md  grid text-center ${borderByType[ByType]} `} >
        <header className={`h-[140px] ${bgByType[ByType]} relative`}></header>

        <div className="grid gap-2 pt-16 bg-white relative  dark:bg-gradient-to-t dark:to-gray-900 dark:from-black dark:text-white">
          <div className="absolute top-0 w-full -translate-y-2/3">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt="image"
              className="max-w-[210px] mx-auto"
            />
          </div>
          <h3 className="text-2xl">{pokemon?.name}</h3>
          <span className="">{types}</span>
          <h5 className="mb-2 text-[#9F9F9F] text-xs">Type</h5>
          
          <ul className="grid grid-cols-2 gap-3 items-center uppercase border-t-4 p-2  border-transparent/10">
            {pokemon?.stats.slice(0, 4).map((stat) => (
              <li key={stat.stat.name} className="mt-2">
                <h6 className="text-[#9F9F9F]">{stat.stat.name}</h6>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Link>
  );
}
export default PokemonCard;
