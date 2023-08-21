import clsx from 'clsx';
import { CloseIcon , Search } from 'src/common/icons';
import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import styles from './Select.module.scss';
import { useAppSelector } from 'src/redux/hooks';

export type AsyncSelectProps<T> = {
	loading?: boolean;
	clearable?: boolean;
	portalElement?: HTMLElement;
	noData?: React.ReactNode;
	noDataLabel?: React.ReactNode;
	options?: T[];
	value?: T;
	placeholder?: string;
	duration?: number;
	minlength?: number;
	input: string,
	classes?: Partial<Record<
		'root' | 'opened' | 'dark' | 'container' | 'input' | 'limit' | 'icon' | 'icons' | 'options' | 'noData' | 'expand' | 'spinner' | 'virtualized',
		ClassesValue | undefined
	>>;
	getValueLabel: (option: T) => string;
	onClear?: () => void;
	onClickItem?: (option: T) => void;
	onChangeInput: (input: string) => void;
	onRequestCall: (input: string) => void;
	children(option: T, activeOption: T | null, onClose: () => void): React.ReactElement;
};

const AsyncSelect = <T,>({
	classes,
	value,
	placeholder = "",
	portalElement,
	noData,
	loading,
	noDataLabel,
	duration = 500,
	input,
	options = [],
	children,
	onClear,
	onClickItem,
	onRequestCall,
	minlength,
	onChangeInput,
	getValueLabel,
	clearable
}: AsyncSelectProps<T>) => {
	const renderedRef = useRef<boolean>(false);
	const { t } = useTranslation();

	const selectRef = useRef<HTMLDivElement>(null);

	const optionsRef = useRef<HTMLDivElement>(null);

	const timer = useRef<NodeJS.Timeout | undefined>(undefined);

	const { ui: { theme } } = useAppSelector(state => state)

	const [debouncing, setDebouncing] = useState(false);

	const [focusing, setFocusing] = useState(false);

	const [visibleOptions, setVisibleOptions] = useState(false);

	const [highlightedOption, setHighlightedOption] = useState<number | null>(null);

	const onClickDocument = (e: MouseEvent) => {
		const optionsEl = optionsRef.current,
			selectEl = selectRef.current;

		if (!optionsEl || !selectEl) return;

		const target: Node = (e.target || e.currentTarget) as Node;

		if (target && !optionsEl.contains(target) && !selectEl.contains(target)) {
			setVisibleOptions(false);
			document.removeEventListener('mousedown', onClickDocument);
		}
	};

	const onChange = (value: string) => {
		if (!renderedRef.current) renderedRef.current = true;

		onChangeInput(value);
		if (value.length > (minlength ?? 0)) setDebouncing(true);
		if (timer.current) clearTimeout(timer.current);

		timer.current = setTimeout(() => {
			setDebouncing(false);
			onRequestCall(value);
		}, duration);
	};

	const toggleOptions = () => {
		setVisibleOptions(!visibleOptions);

		if (!visibleOptions === true) document.addEventListener('mousedown', onClickDocument);
	};

	const noDataRenderer = () => {
		if (noData) return noData;

		return (
			<div className={clsx(styles.noData, classes?.noData)}>
				<span>{noDataLabel ?? t('select.no_data')}</span>
			</div>
		);
	};

	const hideOptions = () => {
		setVisibleOptions(false);
	};

	const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		try {
			if (e.key === 'Enter') {
				onClickItem?.(options[highlightedOption ?? 0]);
				setVisibleOptions(false);
				return;
			}

			if (e.key === 'Tab') {
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

	const isLoading = loading || debouncing;

	const getOptionsStyles = useMemo(() => {
		const styles = {
			width: 0,
			left: 0,
			top: 0,
			height: 0
		};

		const selectEl = selectRef.current;
		if (!selectEl) return styles;

		const elRect = selectEl.getBoundingClientRect();
		styles.width = elRect.width;
		styles.height = elRect.height;
		styles.left = elRect.left;
		styles.top = elRect.top + elRect.height + 1;

		return styles;
	}, [visibleOptions]);

	const boxHeight = useMemo(() => {
		return !options.length
			? '3rem'
			: options.length > 5 ? '192px' : (options.length * 41) + 'px';
	}, [options]);

	useEffect(() => {
		if (!value) onChangeInput("");
	}, [value]);

	useEffect(() => {
		if (visibleOptions || !loading) return;

		toggleOptions();
	}, [loading]);

	useEffect(() => {
		setFocusing(visibleOptions);

		onChangeInput("");
	}, [visibleOptions]);

	return (
		<div
			tabIndex={-1}
			ref={selectRef}
			className={clsx(styles.root, classes?.root, visibleOptions && [styles.opened, classes?.opened], theme === 'dark' && [styles.dark, classes?.dark])}
		>
			<div className={clsx(styles.container, classes?.container, 'input-group')}>
				<span className={clsx(styles.icon, classes?.icon)}>
					<Search width="1rem" height="1rem" />
				</span>

				<input
					value={(focusing || !value) ? input : getValueLabel(value)}
					onKeyDown={onKeydown}
					placeholder={placeholder}
					onFocus={toggleOptions}
					className={clsx(styles.input, classes?.input)}
					onChange={(e) => onChange(e.target.value)}
					data-testid="symbol_search_input"
				/>

				<div className={clsx(styles.icons, classes?.icons)}>
					{(!isLoading && (value || input.length > (minlength ?? 1)) && clearable) &&
						<button role="button" type='button' tabIndex={-1} className={clsx(styles.icon, classes?.icon)} onClick={onClear}>
							<CloseIcon width="1.12rem" height="1.12rem" />
						</button>
					}

					{isLoading &&
						<span
							tabIndex={-1}
							role="button"
							onClick={toggleOptions}
							className={clsx(styles.icon, classes?.icon, visibleOptions && [styles.expand, classes?.expand])}
						>
							<div className={clsx('spinner', styles.spinner, classes?.spinner)} />
						</span>
					}
				</div>

				{((minlength && minlength > 0) && (focusing && input.length > 0 && input.length < minlength)) && (
					<div className={clsx(styles.limit, classes?.limit)}>
						<span>{t('symbol_search.min_search_length', { n: minlength })}</span>
					</div>
				)}
			</div>

			{visibleOptions && createPortal((
				<div
					role="list"
					ref={optionsRef}
					style={{
						width: `${getOptionsStyles.width}px`,
						left: `${getOptionsStyles.left}px`,
						top: `${getOptionsStyles.top}px`,
						opacity: Number(visibleOptions),
						minHeight: boxHeight,
						maxHeight: visibleOptions ? (!options.length ? '5rem' : undefined) : 0,
						pointerEvents: visibleOptions ? undefined : 'none',
						overflowY: visibleOptions ? 'auto' : 'hidden'
					}}
					className={clsx(styles.options, classes?.options, theme === 'dark' && [styles.dark, classes?.dark])}
				>
					{(isLoading)
						? (
							<div className={clsx(styles.noData, classes?.noData)}>
								<span>{t('common.loading')}</span>
							</div>
						)
						: (options.length === 0)
							? noDataRenderer()
							:
							<Virtuoso
								style={{ height: boxHeight }}
								totalCount={options.length}
								className={clsx(styles.virtualized, classes?.virtualized)}
								itemContent={(index) => {
									const option = options[index];

									if (!option) return null;
									return cloneElement(children(option, value ?? null, hideOptions), { focusing: index === highlightedOption });
								}}
							/>
					}
				</div>
			), portalElement ?? document.body)}
		</div>
	);
};

export default AsyncSelect;