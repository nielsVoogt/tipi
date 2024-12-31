import "@mantine/core/styles.css";
import "./index.css";

import { App } from "./App";
import AuthProvider from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
