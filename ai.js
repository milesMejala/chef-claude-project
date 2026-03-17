export async function getRecipeFromChefGPT(ingredientsArr) {
  const response = await fetch("http://localhost:3001/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to fetch recipe from server.");
  }

  const data = await response.json();
  return data.recipe;
}