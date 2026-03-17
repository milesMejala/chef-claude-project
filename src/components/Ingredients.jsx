import React from "react"

export default function Ingredients(props) {

    const listIngredients = props.ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
    })

    return (
        <section className="ingredients-on-hand-container">
            <h2>Ingredients on hand:</h2>
            <ul>{listIngredients}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <p>Ready for a recipe?</p>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="get-recipe-btn" type="button" onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}