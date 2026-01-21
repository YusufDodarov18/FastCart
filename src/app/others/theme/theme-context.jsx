import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) setTheme(saved == "true");
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme
      ? "oklch(21% 0.034 264.665)"
      : "white";
    document.body.style.color = theme ? "white" : "black";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
    theme
      ? toast.success("The theme is lightMode!")
      : toast.success("The theme is darkMode!");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default useTheme;
