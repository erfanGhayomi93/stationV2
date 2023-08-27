import clsx from 'clsx';

import styles from './Checkbox.module.scss';
import { useAppSelector } from 'src/redux/hooks';
import { getTheme } from 'src/redux/slices/ui';

type CheckboxProps = {
	classes?: Partial<Record<
		'root' | 'dark' | 'checkbox' | 'checked' | 'label' | 'text',
		ClassesValue
	>>;
	onChange: (checked: boolean) => void
	checked: boolean;
	label?: string | number;
	disabled?: boolean;
	style?: Partial<Record<
		'root' | 'checkbox' | 'checked' | 'label' | 'text',
		React.CSSProperties
	>>;
};

const Checkbox = ({ classes, disabled, onChange, checked, label, style }: CheckboxProps) => {
	const theme = useAppSelector(getTheme)

	return (
		<div style={style?.root} className={clsx(styles.root, classes?.root, disabled && styles.disabled, theme === 'dark' && [styles.dark, classes?.dark])} data-testid="checkbox_component">
			<label style={style?.label} className={clsx(styles.label, classes?.label)}>
				<input
					type='checkbox'
					checked={checked}
					style={checked ? style?.checked : style?.checkbox}
					onChange={disabled ? undefined : (() => onChange(!checked))}
					className={clsx(styles.checkbox, classes?.checkbox, checked && [styles.checked, classes?.checked])}
				/>

				{label && <span style={style?.text} className={clsx(styles.text, classes?.text)}>{label}</span>}
			</label>
		</div>
	);
};

export default Checkbox;