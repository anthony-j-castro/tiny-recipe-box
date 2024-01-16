import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "~/client/components/App";
import "modern-normalize";
import "~/client/index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
