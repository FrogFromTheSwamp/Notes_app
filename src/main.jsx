import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1 className="text-blue-600 dark:text-sky-400">Hello world!</h1>
  </StrictMode>,
);
