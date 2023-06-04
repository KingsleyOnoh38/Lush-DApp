import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom"

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {EstateContextProvider} from "./context/realEstate";

// import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={ Sepolia }>
        <BrowserRouter>
            <EstateContextProvider>
                <App />
            </EstateContextProvider>
        </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
