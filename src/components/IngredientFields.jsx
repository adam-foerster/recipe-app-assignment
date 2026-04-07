function IngredientFields({
	title,
	ingredients,
	onChangeIngredient,
	onAddIngredient,
	onRemoveIngredient,
}) {
	return (
		<fieldset className="space-y-3">
			<div className="flex items-center justify-between gap-3">
				<legend className="text-lg font-semibold">{title}</legend>
				<button
					type="button"
					onClick={onAddIngredient}
					className="btn btn-sm preset-filled-primary-500"
				>
					Add Ingredient
				</button>
			</div>

			{ingredients.map((item, index) => (
				<div
					key={item.id}
					className="card grid gap-3 p-3 ring-1 ring-surface-200-800 md:grid-cols-[1fr_1fr_auto]"
				>
					<label className="block">
						<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-surface-500-400">
							Ingredient {index + 1}
						</span>
						<input
							type="text"
							value={item.ingredient}
							onChange={(event) =>
								onChangeIngredient(item.id, "ingredient", event.target.value)
							}
							className="input"
							placeholder="e.g. Flour"
						/>
					</label>

					<label className="block">
						<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-surface-500-400">
							Measurement
						</span>
						<input
							type="text"
							value={item.measurement}
							onChange={(event) =>
								onChangeIngredient(item.id, "measurement", event.target.value)
							}
							className="input"
							placeholder="e.g. 2 Cups"
						/>
					</label>

					<div className="flex items-end">
						<button
							type="button"
							onClick={() => onRemoveIngredient(item.id)}
							disabled={ingredients.length === 1}
							className="btn btn-sm w-full preset-filled-error-500 disabled:opacity-50"
						>
							Remove
						</button>
					</div>
				</div>
			))}
		</fieldset>
	);
}

export default IngredientFields;
