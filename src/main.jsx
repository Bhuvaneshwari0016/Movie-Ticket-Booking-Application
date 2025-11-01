import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { MoviesProvider } from "./context/MoviesContext";
import { ShowsProvider } from "./context/showsContext";
import { MessagesProvider } from "./context/MessageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <ShowsProvider>
           <MessagesProvider>
          <App />
        </MessagesProvider>

        </ShowsProvider>
      </MoviesProvider>
    </AuthProvider>
  </React.StrictMode>
);
