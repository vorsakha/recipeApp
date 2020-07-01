import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";

import "./RecipePage.css";

const RecipePage = ({ meal, setIsOpen, modalIsOpen }) => {
  const [ingredients, setIngredients] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [toHome, setToHome] = useState(false);

  useEffect(() => {
    getIngredients();
    getMeasurements();
  }, []);

  const getIngredients = () => {
    const arr = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[0][`strIngredient${i}`] !== "") {
        arr.push(meal[0][`strIngredient${i}`]);
      }
    }
    setIngredients(arr);
  };

  const getMeasurements = () => {
    const arr = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[0][`strMeasure${i}`] !== "") {
        arr.push(meal[0][`strMeasure${i}`]);
      }
    }

    setMeasurements(arr);
  };

  const modalClose = () => {
    setIsOpen(false);

    setToHome(true);
  };

  const saveRecipe = () => {
    localStorage.setItem(meal[0].strMeal, meal[0].strMealThumb);

    setToHome(true);
  };

  Modal.setAppElement("#root");

  return (
    <Fragment>
      {toHome && <Redirect to="/" />}
      <Modal isOpen={modalIsOpen} onRequestClose={() => modalClose()}>
        <div>
          <div className="close">
            <button
              className="close-btn"
              type="button"
              onClick={() => modalClose()}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <h1>
            {meal[0].strMeal}
            <button
              className="add-btn"
              type="button"
              onClick={() => saveRecipe()}
            >
              <i className="fas fa-plus"></i>
            </button>
          </h1>

          <div className="img-container">
            <img className="recipe-img" src={meal[0].strMealThumb} alt="" />
            <div className="recipe-content">
              <ul>
                <h3>Ingredients</h3>
                {ingredients !== null &&
                  ingredients.map((data, k) => <li key={k}>{data}</li>)}
              </ul>
              <ul>
                <h3>Measurements</h3>
                {measurements !== null &&
                  measurements.map((data, k) => <li key={k}>{data}</li>)}
              </ul>
            </div>
          </div>

          <h3>Instructions</h3>
          <p className="text">{meal[0].strInstructions}</p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default RecipePage;
