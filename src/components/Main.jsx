import React from "react"

import "/src/css/Main.css"

export default function Main() {

    const [ingredients, setIngredient] = React.useState([])

    const listIngredients = ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
    })

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient, newIngredient])
        console.log(ingredients)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input 
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                />
                <button type="submit">+ Add ingredient</button>
                <ul>
                    {listIngredients}
                </ul>
            </form>
        </main>
    )
}