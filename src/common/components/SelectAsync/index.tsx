import clsx from 'clsx';
import { ArrowDown, CloseIcon } from 'src/common/icons';
import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './Select.module.scss';
import { useAppSelector } from 'src/redux/hooks';
import { getTheme } from 'src/redux/slices/ui';

type SelectProps<T> = {
	clearable?: boolean;
	portalElement?: HTMLElement;
	noData?: React.ReactNode;
	noDataLabel?: React.ReactNode;
	options?: T[];
	value?: T | null;
	placeholder?: string;
	defaultDialogWidth?: number;
	defaultDialogHeight?: number;
	classes?: Partial<Record<
		'root' | 'opened' | 'dark' | 'container' | 'label' | 'icon' | 'icons' | 'options' | 'noData' | 'placeholder' | 'expand' | 'virtualized',
		ClassesValue | undefined
	>>;
	onChange: (option: T) => void;
	onClear?: () => void;
	getOptionLabel: (option: T) => string | React.ReactElement;
	getOptionId: (option: T) => string | number;
	getInputLabel?: (option: T) => string | number | React.ReactElement;
	children(option: T, activeOption: T | null): React.ReactElement;
};

const Select = <T,>({
	clearable,
	classes,
	value,
	getOptionLabel,
	getInputLabel,
	getOptionId,
	placeholder = "",
	portalElement,
	noData,
	noDataLabel,
	defaultDialogWidth,
	defaultDialogHeight,
	options = [],
	onChange,
	children,
	onClear,
}: SelectProps<T>) => {
	const { t } = useTranslation();

	const selectRef = useRef<HTMLDivElement>(null);

	const optionsRef = useRef<HTMLDivElement>(null);

	const theme = useAppSelector(getTheme)
	
	const [highlightedOption, setHighlightedOption] = useState<number | null>(null);

	const [visibleOptions, setVisibleOptions] = useState(false);

	const onClickDocument = (e: MouseEvent) => {
		const optionsEl = optionsRef.current,
			selectEl = selectRef.current;

		if (!optionsEl || !selectEl) return;

		const target: Node = (e.target || e.currentTarget) as Node;

		if (target && !optionsEl.contains(target) && !selectEl.contains(target)) {
			setVisibleOptions(false);
		}
	};

	const onClearResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		onClear?.();
	};

	const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		try {
			if (e.key === 'Enter') {
				onChange(options[highlightedOption ?? 0]);
				setVisibleOptions(false);
				return;
			}

			let highlightedElementIndex = 0;
			if (e.key === 'ArrowDown') highlightedElementIndex = ((highlightedOption ?? 0) + 1) % options.length;
			else if (e.key === 'ArrowUp') highlightedElementIndex = ((highlightedOption ?? 0) + options.length - 1) % options.length;

			setHighlightedOption(highlightedElementIndex);

			const optionsElement = optionsRef.current;
			if (!optionsElement) return;

			const highlightedElement = optionsElement.children[highlightedElementIndex] as HTMLElement;
			optionsElement.scrollTop = highlightedElement.offsetTop;
		} catch (e) {
			//
		}
	};

	const toggleOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		try {
			e.stopPropagation();
			setVisibleOptions(!visibleOptions);

			setHighlightedOption(null);
		} catch (e) {
			//
		}
	};

	const getOptionsStyles = useMemo(() => {
		const styles = {
			width: 0,
			left: 0,
			top: 0
		};

		const selectEl = selectRef.current;
		if (!selectEl) return styles;

		const elRect = selectEl.getBoundingClientRect();

		styles.width = defaultDialogWidth ?? elRect.width;
		styles.left = elRect.left - Math.abs(styles.width - elRect.width);
		styles.top = elRect.top + elRect.height + 1;

		return styles;
	}, [visibleOptions]);

	const noDataRenderer = () => {
		if (noData) return noData;

		return (
			<div className={clsx(styles.noData, classes?.noData)}>
				<span>{noDataLabel ?? t('common.no_data')}</span>
			</div>
		);
	};

	const hideOptions = () => {
		setVisibleOptions(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', onClickDocument);

		return () => {
			document.removeEventListener('mousedown', onClickDocument);
		};
	}, [optionsRef]);

	useEffect(() => {
		if (!value) return;

		try {
			const id = getOptionId(value);
			const findSelectedIndex = options.findIndex(option => getOptionId(option) === id);

			if (findSelectedIndex === -1) return;
			setHighlightedOption(findSelectedIndex);
		} catch (e) {
			//
		}
	}, []);

	return (
		<div
			ref={selectRef}
			onKeyDown={onKeydown}
			className={clsx(styles.root, classes?.root, visibleOptions && [styles.opened, classes?.opened], theme === 'dark' && [styles.dark, classes?.dark])}
			data-testid="show_select_value"
			tabIndex={-1}
			role="button"
		>
			<select
				onFocus={() => setVisibleOptions(true)}
				onBlur={() => setVisibleOptions(false)}
				style={{ maxWidth: 0, maxHeight: 0, opacity: '0', position: 'absolute', pointerEvents: 'none' }}
			/>

			<div
				tabIndex={-1}
				role="button"
				onClick={toggleOptions}
				className={clsx(styles.container, styles.select, classes?.container)}
			>
				<span data-testid={value ? "option_id[" + getOptionId!(value) + "]" : ""} className={clsx(styles.label, classes?.label, !value && [styles.placeholder, classes?.placeholder])}>{value ? (getInputLabel?.(value) ?? getOptionLabel(value)) : placeholder}</span>

				<div className={clsx(styles.icons, classes?.icons)}>
					{(value && clearable) &&
						<button role="button" type='button' tabIndex={-1} className={clsx(styles.icon, classes?.icon)} onClick={onClearResult}>
							<CloseIcon width="1rem" height="1rem" />
						</button>
					}

					<span className={clsx(styles.icon, classes?.icon, visibleOptions && [styles.expand, classes?.expand])}>
						<ArrowDown width="1rem" height="1rem" />
					</span>
				</div>
			</div>

			{visibleOptions && createPortal((
				<div
					ref={optionsRef}
					style={{
						width: getOptionsStyles.width + 'px',
						left: getOptionsStyles.left + 'px',
						top: getOptionsStyles.top + 'px',
						opacity: Number(visibleOptions),
						height: defaultDialogHeight ? defaultDialogHeight + 'px' : undefined,
						maxHeight: visibleOptions ? (options.length === 0 ? '5rem' : undefined) : 0,
						pointerEvents: visibleOptions ? undefined : 'none',
						overflowY: visibleOptions ? 'auto' : 'hidden'
					}}
					className={clsx(styles.options, classes?.options, theme === 'dark' && [styles.dark, classes?.dark])}
				>
					{options.length === 0
						? noDataRenderer()
						: options.map((option, index) => (
							cloneElement(children(option, value ?? null), { key: index, onChange: () => onChange(option), onClose: hideOptions, focusing: index === highlightedOption, getOptionLabel, getOptionId })
						))
					}
				</div>
			), portalElement ?? document.body)}
		</div>
	);
};

type OptionProps<T> = {
	isActive?: boolean;
	focusing?: boolean;
	option: T;
	getOptionLabel?: (option: T) => string | number;
	getOptionId?: (option: T) => string | number;
	onChange?: (option: T) => void;
	onClose?: () => void;
	onMouseOver?: () => void;
	children?: React.ReactElement;
	classes?: Partial<Record<
		'option' | 'active',
		ClassesValue | undefined
	>>;
};
export const Option = <T,>({ classes, children, isActive, option, getOptionLabel, onChange, onMouseOver, onClose, focusing, getOptionId }: OptionProps<T>) => {
	const onClick = () => {
		onChange?.(option as T);
		onClose?.();
	};

	return (
		<div
			data-testid={"select_option_" + getOptionId!(option)}
			data-index
			data-focus={focusing ? 'true' : 'false'}
			onClick={onClick}
			onMouseOver={onMouseOver}
			className={clsx(styles.option, isActive && [styles.active, classes?.active], classes?.option)}
			tabIndex={-1}
			role="button"
		>
			{children || (<span>{getOptionLabel?.(option)}</span>)}
		</div>
	);
};

Select.Option = Option;
export default Select;