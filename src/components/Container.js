import Weather from "./Weather";
import { useTheme } from "../context/ThemeContext";

function Container() {
  const { theme } = useTheme();
  return (
    <main className={`${theme}`}>
      <div className={`container ${theme}`}>
        <Weather />
      </div>
      <footer>
        Dawid Sośnia <b>236653</b>
      </footer>
    </main>
  );
}

export default Container;
