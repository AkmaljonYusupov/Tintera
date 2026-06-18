import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from 'react'
import App from "./App";

import "./styles/global.scss";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>           {/* ← butun App ni shu ichiga o'rang */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);