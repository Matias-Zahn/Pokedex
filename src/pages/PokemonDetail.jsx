import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeball from "../components/pokedex/HeaderPokeball";
import { bgByType, borderByType, textByType } from "../constants/pokemonTypes";

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);

  const { pokemonId } = useParams();

  const getPercentStat = (statValue) => {
    const MAX_VALUE_STAT = 255;
    const percentStat = ((statValue * 100) / MAX_VALUE_STAT).toFixed(1);
    return `${percentStat}%`;
  };

  const ByType = [pokemon?.types[0].type.name];

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .then((err) => console.log(err));
  }, []);
  return (
    <main>
      <HeaderPokeball />
      <article className="capitalize pb-10 bg-gradient-to-t from-[#FFF] to-[#D3D3D3] p-4 font-['Inter'] dark:bg-gradient-to-t dark:to-gray-900 dark:from-black ">
        <section
          className={`max-w-[1116px] mx-auto rounded-md shadow-xl border-[20px] ${borderByType[ByType]} bg-white mt-10 dark:bg-gradient-to-t dark:to-gray-900 dark:from-black dark:text-white `}
        >
          <header className={` ${bgByType[ByType]} grid place-items-center`}>
            <img
              className="max-w-[350px]"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </header>
          <section className="p-4">
            <div className="grid place-items-center text-center gap-4 py-4">
              <h3 className={`text-[40px] border px-2 ${textByType[ByType]} `}>
                #{pokemon?.id}
              </h3>
              <h2 className={`capitalize text-5xl ${textByType[ByType]} `}>
                {pokemon?.name}
              </h2>
              <section className="flex gap-4 text-lg">
                <div className="grid items-center">
                  <h6>Weight</h6>
                  <h6 className="font-bold">{pokemon?.weight}</h6>
                </div>
                <div>
                  <h6>Height</h6>
                  <h6 className="font-bold">{pokemon?.height}</h6>
                </div>
              </section>
              <section className="flex flex-wrap justify-center gap-4  items-center text-3xl">
                <div className="grid place-items-center gap-2">
                  <h4>Type</h4>
                  <div className="flex flex-wrap justify-center gap-4  items-center">
                    {pokemon?.types.map((type) => (
                      <h3
                        className={` mb-2 text-2xl py-2 text-white rounded-md w-[min(150px)] ${
                          bgByType[type.type.name]
                        } `}
                        key={type.type.name}
                      >
                        {" "}
                        {type.type.name}{" "}
                      </h3>
                    ))}
                  </div>
                </div>
                <div className=" grid place-items-center gap-2">
                  <h4>Abilities</h4>
                  <div className="flex gap-4 items-center">
                    {pokemon?.abilities.slice(0, 2).map((ability) => (
                      <h3
                        className=" mb-2 text-2xl py-2 rounded-md w-[min(150px)] border-2 "
                        key={ability.ability.name}
                      >
                        {ability.ability.name}
                      </h3>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            {/* stats */}
            <h3 className="text-[45px] mb-8">Stats</h3>
            <ul className="grid gap-5 text-2xl px-10 pb-10 font-semibold">
              {pokemon?.stats.map((stat) => (
                <li className="grid gap-4" key={stat.stat.name}>
                  <div className="flex justify-between">
                    <h5>{stat.stat.name}</h5>
                    <span className="text-xl">{stat.base_stat} / 255</span>
                  </div>
                  <div className="bg-slate-100 h-9 rounded overflow-hidden">
                    <div
                      style={{ width: getPercentStat(stat.base_stat) }}
                      className="bg-gradient-to-r from-yellow-300 to-orange-500 h-full"
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section
          className={`p-4 max-w-[1116px] mx-auto rounded-md shadow-xl border-[20px] ${borderByType[ByType]} bg-white mt-10  dark:bg-black`}
        >
          <ul className="flex flex-wrap justify-around gap-4 p-4">
            {pokemon?.moves.slice(0, 23).map((move) => (
              <li
                key={move.move.name}
                className="py-[18px] px-[38px] border-4 text-center text-2xl bg-[#E5E5E5] rounded-[50px]"
              >
                {move.move.name}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
export default PokemonDetail;
