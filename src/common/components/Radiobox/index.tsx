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
			className={clsx(classes?.root, 'flex items-center cursor-pointer gap-6', checked ? 'text-gray-800 dark:text-dark-gray-800' : 'text-gray-600 dark:text-dark-gray-600')}
			tabIndex={-1}
			role="radio"
			aria-checked={checked}
		>
			<div className="flex items-center justify-center rounded-circle border border-current w-16 h-16">
				{checked && <div style={{ width: '8px', height: '8px' }} className="rounded-circle bg-primary-100 dark:bg-dark-primary-100" />}
			</div>

			<span className={clsx(classes?.label, 'text-sm')}>{label}</span>
		</div>
	);
};

export default Radiobox;