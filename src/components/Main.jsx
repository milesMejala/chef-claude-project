import React from "react"

import "/src/css/Main.css"

import Ingredients from "./Ingredients"
import Recipe from "./Recipe"
import { getRecipeFromChefGPT } from "/ai.js"

export default function Main() {

    const [ingredients, setIngredient] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient, newIngredient])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromChefGPT(ingredients)
        setRecipe(recipeMarkdown)
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
                <button className="add-ingredient-btn" type="submit">+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <Ingredients 
                    ingredients={ingredients} 
                    getRecipe={getRecipe} 
                />
            }
            {recipe && <Recipe recipe={recipe}/>}
        </main>
    )
}