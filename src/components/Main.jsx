import React from "react"

import "/src/css/Main.css"

export default function Main() {

    const [ingredients, setIngredient] = React.useState([])

    const listIngredients = ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
    })

    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient, newIngredient])
        console.log(ingredients)
    }

    return (
        <main>
            <form action={handleSubmit}>
                <input 
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                />
                <button class="add-ingredient-btn" type="submit">+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <section class="ingredients-on-hand-container">
                <h2>Ingredients on hand:</h2>
                <ul>{listIngredients}</ul>
                <div class="get-recipe-container">
                    <div>
                        <p>Ready for a recipe?</p>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button class="get-recipe-btn">Get a recipe</button>
                </div>
            </section>}
        </main>
    )
}