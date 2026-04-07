import { useMemo, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

const createIngredient = (ingredient, measurement) => ({
	id: crypto.randomUUID(),
	ingredient,
	measurement,
});

const createDirection = (step) => ({
	id: crypto.randomUUID(),
	step,
});

const createStarterRecipes = () => [
	{
		id: crypto.randomUUID(),
		name: "Chocolate Chip Cookies",
		ingredients: [
			createIngredient("Flour", "2 Cups"),
			createIngredient("Butter", "1 Cup"),
			createIngredient("Chocolate Chips", "1.5 Cups"),
		],
		directions: [
			createDirection("Preheat oven to 350F and line a baking tray."),
			createDirection("Cream butter with sugar, then fold in dry ingredients."),
			createDirection("Scoop dough and bake for 10 to 12 minutes."),
		],
		isFavorite: true,
	},
	{
		id: crypto.randomUUID(),
		name: "Garlic Pasta",
		ingredients: [
			createIngredient("Spaghetti", "12 oz"),
			createIngredient("Olive Oil", "3 Tbsp"),
			createIngredient("Garlic", "4 Cloves, sliced"),
		],
		directions: [
			createDirection("Cook pasta in salted water until al dente."),
			createDirection(
				"Warm oil and garlic until fragrant, then add chili flakes.",
			),
			createDirection("Toss pasta with garlic oil and finish with parsley."),
		],
		isFavorite: false,
	},
	{
		id: crypto.randomUUID(),
		name: "Veggie Omelet",
		ingredients: [
			createIngredient("Eggs", "3"),
			createIngredient("Spinach", "1 Cup"),
			createIngredient("Bell Pepper", "1/2 Cup diced"),
		],
		directions: [
			createDirection("Whisk eggs with a pinch of salt and pepper."),
			createDirection("Saute vegetables for 2 to 3 minutes."),
			createDirection("Pour eggs in pan, fold omelet, and serve warm."),
		],
		isFavorite: false,
	},
	{
		id: crypto.randomUUID(),
		name: "Berry Smoothie",
		ingredients: [
			createIngredient("Frozen Berries", "1.5 Cups"),
			createIngredient("Greek Yogurt", "1/2 Cup"),
			createIngredient("Milk", "3/4 Cup"),
		],
		directions: [
			createDirection("Add berries, yogurt, and milk to blender."),
			createDirection("Blend until smooth and creamy."),
			createDirection("Taste and adjust thickness with extra milk if needed."),
		],
		isFavorite: true,
	},
];

function App() {
	const [recipes, setRecipes] = useState(() => createStarterRecipes());
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

	const visibleRecipes = useMemo(
		() =>
			showFavoritesOnly
				? recipes.filter((recipe) => recipe.isFavorite)
				: recipes,
		[recipes, showFavoritesOnly],
	);

	const addRecipe = (recipe) => {
		setRecipes((prev) => [...prev, recipe]);
	};

	const saveRecipe = (updatedRecipe) => {
		setRecipes((prev) =>
			prev.map((recipe) =>
				recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
			),
		);
	};

	const deleteRecipe = (idToDelete) => {
		setRecipes((prev) => prev.filter((recipe) => recipe.id !== idToDelete));
	};

	const toggleFavorite = (idToToggle) => {
		setRecipes((prev) =>
			prev.map((recipe) =>
				recipe.id === idToToggle
					? { ...recipe, isFavorite: !recipe.isFavorite }
					: recipe,
			),
		);
	};

	const favoriteCount = recipes.filter((recipe) => recipe.isFavorite).length;

	return (
		<div data-theme="vintage" className="min-h-screen">
			<main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
				<header className="card relative overflow-hidden p-6 ring-1 ring-surface-300-700">
					<div className="relative flex flex-wrap items-center justify-between gap-4">
						<div>
							<p className="chip preset-filled-surface-200-800">Recipes</p>
							<h1 className="mt-3 text-4xl font-black tracking-tight">
								Recipe
							</h1>
							<p className="mt-2 max-w-2xl text-surface-500-400">
								Build, edit, favorite, and filter your recipes with one reactive
								source of truth.
							</p>
						</div>

						<div className="space-y-2">
							<p className="text-sm font-semibold uppercase tracking-wide text-surface-500-400">
								Favorites
							</p>
							<div className="flex items-center gap-2">
								<span className="badge preset-filled-warning-500">
									{favoriteCount}
								</span>
								<button
									type="button"
									onClick={() => setShowFavoritesOnly((prev) => !prev)}
									className={`btn ${
										showFavoritesOnly
											? "preset-filled-warning-500"
											: "preset-filled-surface-200-800"
									}`}
								>
									{showFavoritesOnly
										? "Showing Favorites"
										: "Show Favorites Only"}
								</button>
							</div>
						</div>
					</div>
				</header>

				<section className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr]">
					<RecipeList
						recipes={visibleRecipes}
						showFavoritesOnly={showFavoritesOnly}
						onDeleteRecipe={deleteRecipe}
						onToggleFavorite={toggleFavorite}
						onSaveRecipe={saveRecipe}
					/>

					<div className="lg:sticky lg:top-6">
						<RecipeForm onAddRecipe={addRecipe} />
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
