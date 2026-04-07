function DirectionFields({
	title,
	directions,
	onChangeDirection,
	onAddDirection,
	onRemoveDirection,
}) {
	return (
		<fieldset className="space-y-3">
			<div className="flex items-center justify-between gap-3">
				<legend className="text-lg font-semibold">{title}</legend>
				<button
					type="button"
					onClick={onAddDirection}
					className="btn btn-sm preset-filled-secondary-500"
				>
					Add Instruction
				</button>
			</div>

			{directions.map((item, index) => (
				<div
					key={item.id}
					className="card grid gap-3 p-3 ring-1 ring-surface-200-800 md:grid-cols-[1fr_auto]"
				>
					<label className="block">
						<span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-surface-500-400">
							Step {index + 1}
						</span>
						<textarea
							value={item.step}
							onChange={(event) =>
								onChangeDirection(item.id, event.target.value)
							}
							className="textarea min-h-20"
							placeholder="Describe this step"
						/>
					</label>

					<div className="flex items-end">
						<button
							type="button"
							onClick={() => onRemoveDirection(item.id)}
							disabled={directions.length === 1}
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

export default DirectionFields;
