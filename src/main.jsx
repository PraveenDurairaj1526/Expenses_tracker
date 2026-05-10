import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(

  <ThemeProvider >
    <Provider store={store}>
      <Toaster position="top-right" />
      <App />
    </Provider>
  </ThemeProvider>
);