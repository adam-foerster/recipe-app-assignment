import { useState } from "react";
import DirectionFields from "./DirectionFields";
import IngredientFields from "./IngredientFields";

const createIngredient = () => ({
	id: crypto.randomUUID(),
	ingredient: "",
	measurement: "",
});

const createDirection = () => ({
	id: crypto.randomUUID(),
	step: "",
});

const cloneRecipe = (recipe) => ({
	...recipe,
	ingredients: recipe.ingredients.map((item) => ({ ...item })),
	directions: recipe.directions.map((item) => ({ ...item })),
});

function RecipeCard({
	recipe,
	onDeleteRecipe,
	onToggleFavorite,
	onSaveRecipe,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(cloneRecipe(recipe));
	const [errorMessage, setErrorMessage] = useState("");

	const startEdit = () => {
		setDraft(cloneRecipe(recipe));
		setErrorMessage("");
		setIsEditing(true);
	};

	const cancelEdit = () => {
		setDraft(cloneRecipe(recipe));
		setErrorMessage("");
		setIsEditing(false);
	};

	const updateIngredient = (id, key, value) => {
		setDraft((prev) => ({
			...prev,
			ingredients: prev.ingredients.map((item) =>
				item.id === id ? { ...item, [key]: value } : item,
			),
		}));
	};

	const updateDirection = (id, value) => {
		setDraft((prev) => ({
			...prev,
			directions: prev.directions.map((item) =>
				item.id === id ? { ...item, step: value } : item,
			),
		}));
	};

	const addIngredient = () => {
		setDraft((prev) => ({
			...prev,
			ingredients: [...prev.ingredients, createIngredient()],
		}));
	};

	const addDirection = () => {
		setDraft((prev) => ({
			...prev,
			directions: [...prev.directions, createDirection()],
		}));
	};

	const removeIngredient = (id) => {
		setDraft((prev) => ({
			...prev,
			ingredients:
				prev.ingredients.length > 1
					? prev.ingredients.filter((item) => item.id !== id)
					: prev.ingredients,
		}));
	};

	const removeDirection = (id) => {
		setDraft((prev) => ({
			...prev,
			directions:
				prev.directions.length > 1
					? prev.directions.filter((item) => item.id !== id)
					: prev.directions,
		}));
	};

	const validate = () => {
		if (!draft.name.trim()) {
			return "Recipe name is required.";
		}

		if (
			draft.ingredients.some(
				(item) => !item.ingredient.trim() || !item.measurement.trim(),
			)
		) {
			return "Each ingredient needs both a name and measurement.";
		}

		if (draft.directions.some((item) => !item.step.trim())) {
			return "Each direction step must contain text.";
		}

		return "";
	};

	const saveEdit = () => {
		const validationError = validate();
		if (validationError) {
			setErrorMessage(validationError);
			return;
		}

		onSaveRecipe({
			...draft,
			name: draft.name.trim(),
			ingredients: draft.ingredients.map((item) => ({
				...item,
				ingredient: item.ingredient.trim(),
				measurement: item.measurement.trim(),
			})),
			directions: draft.directions.map((item) => ({
				...item,
				step: item.step.trim(),
			})),
		});

		setErrorMessage("");
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<article className="card space-y-5 p-5 ring-1 ring-primary-200-800">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<h3 className="text-xl font-bold">Editing Recipe</h3>
					<span className="chip preset-filled-warning-500">
						Unsaved Changes
					</span>
				</div>

				<label className="block">
					<span className="mb-1 block text-sm font-semibold">Recipe Name</span>
					<input
						type="text"
						value={draft.name}
						onChange={(event) =>
							setDraft((prev) => ({ ...prev, name: event.target.value }))
						}
						className="input"
					/>
				</label>

				<IngredientFields
					title="Edit Ingredients"
					ingredients={draft.ingredients}
					onChangeIngredient={updateIngredient}
					onAddIngredient={addIngredient}
					onRemoveIngredient={removeIngredient}
				/>

				<DirectionFields
					title="Edit Directions"
					directions={draft.directions}
					onChangeDirection={updateDirection}
					onAddDirection={addDirection}
					onRemoveDirection={removeDirection}
				/>

				{errorMessage ? (
					<p className="badge preset-filled-error-500">{errorMessage}</p>
				) : null}

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={saveEdit}
						className="btn preset-filled-success-500"
					>
						Save Changes
					</button>
					<button
						type="button"
						onClick={cancelEdit}
						className="btn preset-filled-surface-200-800"
					>
						Cancel
					</button>
				</div>
			</article>
		);
	}

	return (
		<article className="card p-5 ring-1 ring-surface-200-800">
			<header className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h3 className="text-2xl font-black tracking-tight">{recipe.name}</h3>
					<p className="mt-1 text-sm text-surface-500-400">
						{recipe.ingredients.length} ingredients
					</p>
				</div>
				{recipe.isFavorite ? (
					<span className="badge preset-filled-warning-500">Favorite</span>
				) : null}
			</header>

			<section className="mb-4 grid gap-4 md:grid-cols-2">
				<div>
					<h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-surface-500-400">
						Ingredients
					</h4>
					<ul className="space-y-1">
						{recipe.ingredients.map((item) => (
							<li
								key={item.id}
								className="flex items-start justify-between gap-2"
							>
								<span>{item.ingredient}</span>
								<span className="chip preset-filled-surface-200-800">
									{item.measurement}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-surface-500-400">
						Directions
					</h4>
					<ol className="list-decimal space-y-1 pl-5">
						{recipe.directions.map((item) => (
							<li key={item.id}>{item.step}</li>
						))}
					</ol>
				</div>
			</section>

			<div className="flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => onToggleFavorite(recipe.id)}
					className={`btn ${
						recipe.isFavorite
							? "preset-filled-warning-500"
							: "preset-filled-surface-200-800"
					}`}
				>
					{recipe.isFavorite ? "Unfavorite" : "Favorite"}
				</button>
				<button
					type="button"
					onClick={startEdit}
					className="btn preset-filled-secondary-500"
				>
					Edit
				</button>
				<button
					type="button"
					onClick={() => onDeleteRecipe(recipe.id)}
					className="btn preset-filled-error-500"
				>
					Delete
				</button>
			</div>
		</article>
	);
}

export default RecipeCard;
