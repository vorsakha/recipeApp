import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import MyRecipes from "./components/local/MyRecipes";
import AddRecipe from "./components/api/AddRecipe";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={MyRecipes} />
          <Route exact path="/add" component={AddRecipe} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
