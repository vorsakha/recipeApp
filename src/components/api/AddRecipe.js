import React, { useState, useEffect } from "react";
import axios from "axios";

import "./AddRecipe.css";

import RecipePage from "./RecipePage";

const AddRecipe = () => {
  const [categories, setCategories] = useState(null);
  const [meals, setMeals] = useState(null);
  const [meal, setMeal] = useState(null);
  const [theOne, setTheOne] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theOne]);

  //   useEffect(() => {
  //     getMealById();
  //   }, [mealId]);

  const getCategories = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    setCategories(res.data.categories);
  };

  const getMeals = async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${theOne}`
    );

    setMeals(res.data.meals);
  };

  const getMealById = async (id) => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    setMeal(res.data.meals);
    setIsOpen(true);
  };

  return (
    <div className="category-container">
      {meal === null && <h1>Search by category:</h1>}
      <div className="add-recipe">
        {meals === null &&
          categories !== null &&
          categories.map((data, k) => (
            <div key={k}>
              <button
                className="center-text"
                type="button"
                onClick={() => {
                  setTheOne(data.strCategory);
                }}
              >
                <img src={data.strCategoryThumb} alt="" />
                <p>{data.strCategory}</p>
              </button>
            </div>
          ))}
        <ul>
          {meal === null &&
            meals !== null &&
            meals.map((data, k) => (
              <li key={k}>
                <button
                  className="cat-btn"
                  type="button"
                  onClick={() => {
                    getMealById(data.idMeal);
                  }}
                >
                  <p>{data.strMeal}</p>
                </button>
              </li>
            ))}
        </ul>
        {categories !== null && meals !== null && meal !== null && (
          <RecipePage
            meal={meal}
            setIsOpen={setIsOpen}
            modalIsOpen={modalIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default AddRecipe;
