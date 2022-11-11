import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import "semantic-ui-css/semantic.min.css";
import 'react-calendar/dist/Calendar.css';

import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
<link
  rel="stylesheet"
  href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
></link>;
document.head.appendChild(styleLink);

root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
