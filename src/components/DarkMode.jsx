import { IconMoonFilled, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function DarkMode() {
    const [theme, setTheme] = useState("light");
    const BodyHTML = document.querySelector("body");

    useEffect(() => {
      if (theme === "dark") BodyHTML.classList.toggle("dark");
    }, [theme]);
  
    const handleTheme = () => {
      if (theme === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };
  
    return (
      <div>
        <button onClick={handleTheme} className=" p-4 rounded-full bg-black text-white">
          {
            BodyHTML.classList.contains('dark') ? <IconSun  size={30}/>  : <IconMoonFilled size={30} />
          }
        </button>
      </div>
    );
}
export default DarkMode