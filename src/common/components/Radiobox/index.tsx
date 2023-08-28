import clsx from "clsx";

type RadioboxType = {
	checked: boolean;
	label: string;
	onChange: () => void;
	classes?: Partial<Record<
		'root' | 'label',
		ClassesValue
	>>;
}
const Radiobox = ({ onChange, checked, label, classes }: RadioboxType) => {
	return (
		<div
			onClick={onChange}
			className={clsx(classes?.root, 'flex items-center cursor-pointer gap-1 text-L-gray-700 dark:text-D-gray-700')}
			tabIndex={-1}
			role="radio"
			aria-checked={checked}
		>
			<div className={clsx("flex items-center justify-center rounded-full border w-4 h-4", {
				"border-L-info-100 dark:border-D-info-100": checked,
				"border-L-gray-700 dark:border-D-gray-700": !checked,
			})}>
				{checked && <div style={{ width: '8px', height: '8px' }} className="rounded-full bg-L-info-100 dark:bg-D-info-100" />}
			</div>

			<span className={clsx(classes?.label, 'text-sm')}>{label}</span>
		</div>
	);
};

export default Radiobox;