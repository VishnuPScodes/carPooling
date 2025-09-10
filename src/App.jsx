import { useState } from "react";
import "./App.css";
import styles from "./styles/home.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
