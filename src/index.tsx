import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
