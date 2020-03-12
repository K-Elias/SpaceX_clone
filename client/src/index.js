import React from "react";
import { render } from 'react-dom';
import Routes from "./router";
import register from "./registerServiceWorker";

const app = document.getElementById("app");

if (app) render(<Routes />, app);
else throw new Error("No app element");

register();