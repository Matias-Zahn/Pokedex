import { useDispatch } from "react-redux";
import { setTrainerName } from "../Store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };
  return (
    <main className="relative h-screen overflow-y-hidden">
      <div className="h-[80%] grid place-items-center ">
        <section className="p-4 text-center grid gap-5">
          <img src="/logo.png" alt="" />
          <h1 className="text-5xl text-red-500 font-bold">Hi trainer!</h1>
          <p className="text-2xl text-[#302F2F] font-semibold">
            To start, give me your name
          </p>

          <form
            onSubmit={handleSubmit}
            className=" shadow-md "
          >
            <input
              className=" px-2 text-2xl outline-none w-[70%] h-20"
              name="trainerName"
              type="text"
              autoComplete="off"
              placeholder="Your name...."
            />
            <button className=" w-[30%]  h-20 text-white bg-red-500 hover:bg-red-900 transition-colors text-2xl">
              Let go!
            </button>
          </form>
        </section>
      </div>
      <footer className="relative h-[20%] flex flex-col justify-end">
        <div className="bg-[#DD1A1A]  h-32"></div>
        <div className="bg-black h-14 grid place-content-center relative">
          <div className="absolute right-1/2 top-0 -translate-y-2/4  translate-x-1/2 grid place-items-center ">
            <img className="" src="/pokeballHeader1.png" alt="" />
            <div className="absolute">
              <img className="" src="/pokeballHeader2.png" alt="" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
export default Home;
