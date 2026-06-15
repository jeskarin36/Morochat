import { StrictMode } from "react";
import {ClerkProvider} from "@clerk/react"
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider>
             <App/>
        </ClerkProvider>
    </StrictMode>
)