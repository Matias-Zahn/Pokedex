/* eslint-disable  */
import PokemonCard from "./PokemonCard"

function PokemonList({pokemos}) {
  return (
    <section className="grid justify-center mt-10 grid-cols-[repeat(auto-fit,300px)] gap-4 text-black">
        {
            pokemos.map((pokemon) => <PokemonCard key={pokemon.url} pokemonURL={pokemon.url}/>)
        }
    </section>
  )
}
export default PokemonList