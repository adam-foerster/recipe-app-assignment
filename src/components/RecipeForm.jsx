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

function RecipeForm({ onAddRecipe }) {
	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState([createIngredient()]);
	const [directions, setDirections] = useState([createDirection()]);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const updateIngredient = (id, key, value) => {
		setIngredients((prev) =>
			prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
		);
	};

	const updateDirection = (id, value) => {
		setDirections((prev) =>
			prev.map((item) => (item.id === id ? { ...item, step: value } : item)),
		);
	};

	const addIngredient = () => {
		setIngredients((prev) => [...prev, createIngredient()]);
	};

	const addDirection = () => {
		setDirections((prev) => [...prev, createDirection()]);
	};

	const removeIngredient = (id) => {
		setIngredients((prev) =>
			prev.length > 1 ? prev.filter((item) => item.id !== id) : prev,
		);
	};

	const removeDirection = (id) => {
		setDirections((prev) =>
			prev.length > 1 ? prev.filter((item) => item.id !== id) : prev,
		);
	};

	const validate = () => {
		if (!name.trim()) {
			return "Recipe name is required.";
		}

		if (
			ingredients.some(
				(item) => !item.ingredient.trim() || !item.measurement.trim(),
			)
		) {
			return "Each ingredient needs both a name and measurement.";
		}

		if (directions.some((item) => !item.step.trim())) {
			return "Each direction step must contain text.";
		}

		return "";
	};

	const resetForm = () => {
		setName("");
		setIngredients([createIngredient()]);
		setDirections([createDirection()]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSuccessMessage("");

		const validationError = validate();
		if (validationError) {
			setErrorMessage(validationError);
			return;
		}

		onAddRecipe({
			id: crypto.randomUUID(),
			name: name.trim(),
			ingredients: ingredients.map((item) => ({
				...item,
				ingredient: item.ingredient.trim(),
				measurement: item.measurement.trim(),
			})),
			directions: directions.map((item) => ({
				...item,
				step: item.step.trim(),
			})),
			isFavorite: false,
		});

		setErrorMessage("");
		setSuccessMessage("Recipe added.");
		resetForm();
	};

	return (
		<section className="card p-6 backdrop-blur-sm ring-1 ring-surface-200-800">
			<div className="mb-4 flex items-center gap-3">
				<h2 className="text-2xl font-black tracking-tight">Add Recipe</h2>
				<span className="badge preset-filled-primary-500">New</span>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				<label className="block">
					<span className="mb-1 block text-sm font-semibold">Recipe Name</span>
					<input
						type="text"
						value={name}
						onChange={(event) => setName(event.target.value)}
						className="input"
						placeholder="e.g. Chocolate Chip Cookies"
					/>
				</label>

				<IngredientFields
					title="Ingredients"
					ingredients={ingredients}
					onChangeIngredient={updateIngredient}
					onAddIngredient={addIngredient}
					onRemoveIngredient={removeIngredient}
				/>

				<DirectionFields
					title="Directions"
					directions={directions}
					onChangeDirection={updateDirection}
					onAddDirection={addDirection}
					onRemoveDirection={removeDirection}
				/>

				{errorMessage ? (
					<p className="badge preset-filled-error-500">{errorMessage}</p>
				) : null}
				{successMessage ? (
					<p className="badge preset-filled-success-500">{successMessage}</p>
				) : null}

				<button type="submit" className="btn preset-filled-primary-500">
					Save Recipe
				</button>
			</form>
		</section>
	);
}

export default RecipeForm;
