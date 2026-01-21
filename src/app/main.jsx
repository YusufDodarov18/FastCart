import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { store } from "../provider/store/store.js";
import { ThemeContextProvider } from "./others/theme/theme-context.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>,
);
