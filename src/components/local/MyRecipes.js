import React, { useEffect, useState } from "react";
import axios from "axios";

import RecipePage from "../api/RecipePage";

import "./MyRecipes.css";

const MyRecipes = () => {
  const [localData, setLocalData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    let newArr = [];

    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        name: key,
        avatar: value,
      });
    });

    newArr.length > 0 && setLocalData(newArr);
  }, []);

  const getRecipe = async (name) => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    setMeal(res.data.meals);

    setIsOpen(true);
  };

  const deleteAll = () => {
    if (window.confirm("Are you sure?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const deleteByName = (name) => {
    localStorage.removeItem(name);

    // Reload items
    let newArr = [];

    Object.entries(localStorage).forEach(([key, value]) => {
      newArr.unshift({
        name: key,
        avatar: value,
      });
    });

    newArr.length > 0 && setLocalData(newArr);
  };

  return (
    <div className="my-container">
      {localData !== null && <h1 className="title">My Recipes</h1>}
      <div className="my-wrapper">
        {localData !== null ? (
          localData.map((data, k) => (
            <div className="my-recipes" key={k}>
              <div className="overlay">
                <div
                  className="img-div"
                  style={{ backgroundImage: `url(${data.avatar})` }}
                >
                  <button
                    className="trash"
                    type="button"
                    onClick={() => deleteByName(data.name)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <button
                className="recipe-btn"
                onClick={() => getRecipe(data.name)}
                type="button"
              >
                <h3>{data.name}</h3>
              </button>
            </div>
          ))
        ) : (
          <h2>No recipe added</h2>
        )}
        {modalIsOpen && (
          <RecipePage
            meal={meal}
            setIsOpen={setIsOpen}
            modalIsOpen={modalIsOpen}
          />
        )}
      </div>
      {localStorage.length > 1 && (
        <button
          className="danger-btn"
          type="button"
          onClick={() => deleteAll()}
        >
          Delete all recipes
        </button>
      )}
    </div>
  );
};

export default MyRecipes;
