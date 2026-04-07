import RecipeCard from "./RecipeCard";

function RecipeList({
	recipes,
	showFavoritesOnly,
	onDeleteRecipe,
	onToggleFavorite,
	onSaveRecipe,
}) {
	const emptyMessage = showFavoritesOnly
		? "No favorite recipes yet. Mark a recipe as favorite to see it here."
		: "No recipes yet. Add your first recipe above.";

	return (
		<section className="space-y-4">
			<div className="flex items-center gap-3">
				<h2 className="text-2xl font-black tracking-tight">Recipes</h2>
				<span className="badge preset-filled-surface-200-800">
					{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
				</span>
			</div>

			{recipes.length === 0 ? (
				<div className="card p-6 ring-1 ring-surface-200-800">
					<p className="text-surface-500-400">{emptyMessage}</p>
				</div>
			) : (
				<div className="space-y-4">
					{recipes.map((recipe) => (
						<RecipeCard
							key={recipe.id}
							recipe={recipe}
							onDeleteRecipe={onDeleteRecipe}
							onToggleFavorite={onToggleFavorite}
							onSaveRecipe={onSaveRecipe}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default RecipeList;
