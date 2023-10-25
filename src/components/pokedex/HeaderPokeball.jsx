import DarkMode from "../DarkMode"

function HeaderPokeball() {
  return (
    <header className="relative">
        <div className="bg-[#DD1A1A] flex items-end h-32">
          <img className=" ml-5 hidden sm:block sm:max-w-[400px]" src="/logo.png" alt="" />
        </div>
        <div className="bg-black h-10 ">
          <div className="absolute right-[50%] top-[50%] translate-x-1/2 sm:right-[10%] translate-y-2 grid place-items-center ">
            <img className=" max-w-[100px] sm:max-w-none" src="/pokeballHeader1.png" alt="" />
            <div className="absolute grid place-items-center">
              <img className="max-w-[60px] sm:max-w-none" src="/pokeballHeader2.png" alt="" />
              <div className="absolute">
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}
export default HeaderPokeball