# Recipe App Assignment Starter Guide

This folder is a clean React starter for your Recipe App assignment. It currently includes no assignment features so you can build everything yourself in a structured way.

## Quick Start

1. Open a terminal in this folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local Vite URL in your browser.

## Assignment Build Plan (Step by Step)

Follow these steps in order to cover every requirement in the rubric.

### 1. Create a complex data model first

In `App.jsx`, create one source of truth:

```jsx
const [recipes, setRecipes] = useState([]);
```

Each recipe object should include all required data elements:

```jsx
{
  id: crypto.randomUUID(),
  name: "Chocolate Chip Cookies",
  ingredients: [
    { id: crypto.randomUUID(), ingredient: "Flour", measurement: "2 Cups" },
    { id: crypto.randomUUID(), ingredient: "Butter", measurement: "1 Cup" }
  ],
  directions: [
    { id: crypto.randomUUID(), step: "Preheat oven to 350F." },
    { id: crypto.randomUUID(), step: "Mix ingredients in a bowl." }
  ],
  isFavorite: false
}
```

This satisfies the required data model fields:

- Name
- Measurements
- Ingredients
- Recipe directions

### 2. Build recipe viewing first (2 points)

Create display components, such as:

- `RecipeList`
- `RecipeCard`

Each recipe card should show:

- Name
- Ingredients with their measurements
- Directions (instruction list)

### 3. Add new recipes (6 points)

Create a `RecipeForm` with inputs for:

- Recipe name
- Dynamic ingredient rows (ingredient + measurement)
- Dynamic direction rows (instruction text)

Implementation details:

- Start with one ingredient row and one direction row.
- Add buttons like "Add Ingredient" and "Add Instruction" to create additional rows.
- On submit, build one recipe object and append it to `recipes` using `setRecipes`.

### 4. Edit recipes and every individual field (6 points)

Users must be able to edit each field individually:

- Recipe name
- Each ingredient name
- Each measurement
- Each direction step

A practical approach:

- Add an "Edit" button on each recipe.
- Render editable inputs for that recipe only.
- Save by replacing only the updated recipe in the array.

Use immutable updates, for example:

```jsx
setRecipes((prev) =>
	prev.map((recipe) =>
		recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
	),
);
```

### 5. Delete recipes (1 point)

Add a "Delete" button per recipe:

```jsx
setRecipes((prev) => prev.filter((recipe) => recipe.id !== idToDelete));
```

### 6. Favorite recipes (1 point)

Add a favorite toggle per recipe:

```jsx
setRecipes((prev) =>
	prev.map((recipe) =>
		recipe.id === idToToggle
			? { ...recipe, isFavorite: !recipe.isFavorite }
			: recipe,
	),
);
```

### 7. View only favorites (2 points)

Add a boolean UI filter like `showFavoritesOnly`.

- If false: render all recipes.
- If true: render only recipes where `isFavorite` is true.

### 8. Good user experience (3 points)

Make usage obvious and simple:

- Clear section headings (Recipes, Add Recipe, Favorites)
- Buttons with clear labels
- Form validation for empty fields
- Helpful empty states (for example, "No recipes yet")
- Visible success behavior when adding or saving

### 9. Required technical checks (must have)

Before submitting, verify all of these:

- Every feature updates the `recipes` data array.
- UI updates immediately after every add/edit/delete/favorite action.
- No direct mutation of state arrays or objects.
- The app is located in your repository root structure as required by your class instructions.

## Suggested File Growth

As you add features, a common structure is:

```text
src/
  App.jsx
  components/
    RecipeList.jsx
    RecipeCard.jsx
    RecipeForm.jsx
    IngredientFields.jsx
    DirectionFields.jsx
```

## Milestone Checklist

- [ ] View recipes (name, ingredients with measurements, directions)
- [ ] Add recipe with one or many ingredient rows
- [ ] Add recipe with one or many instruction rows
- [ ] Edit each field individually
- [ ] Delete recipe
- [ ] Favorite recipe
- [ ] Filter to favorites only
- [ ] Keep state reactive with immutable updates
- [ ] Clean and obvious user experience

## Notes

This starter was placed in a separate folder so your existing `basic-Deploy` app stays unchanged. If your instructor requires the final assignment app at a different exact location, move it only when you are ready to submit.
