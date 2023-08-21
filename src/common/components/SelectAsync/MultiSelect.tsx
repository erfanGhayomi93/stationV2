import clsx from 'clsx';
import { ArrowDown, CloseIcon } from 'src/common/icons';

import React, { cloneElement, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import styles from './Select.module.scss';
import { useAppSelector } from 'src/redux/hooks';

export type MultiSelectProps<T> = {
	clearable?: boolean;
	portalElement?: HTMLElement;
	noData?: React.ReactNode;
	noDataLabel?: React.ReactNode;
	options?: T[];
	value?: T[];
	placeholder?: string;
	defaultDialogWidth?: number;
	defaultDialogHeight?: number;
	classes?: Partial<Record<
		'root' | 'opened' | 'dark' | 'list' | 'listItem' | 'container' | 'label' | 'icon' | 'icons' | 'options' | 'noData' | 'placeholder' | 'expand' | 'virtualized',
		ClassesValue | undefined
	>>;
	onClear?: () => void;
	getOptionLabel: (option: T) => string | React.ReactElement;
	children(option: T, activeOptions: T[] | null): React.ReactElement;
};

const MultiSelect = <T,>({
	classes,
	value,
	getOptionLabel,
	placeholder = "",
	portalElement,
	noData,
	noDataLabel,
	defaultDialogWidth,
	defaultDialogHeight,
	options = [],
	children,
	onClear,
	clearable
}: MultiSelectProps<T>) => {
	const { t } = useTranslation();

	const selectRef = useRef<HTMLDivElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);

	const { ui: { theme } } = useAppSelector(state => state)

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

	const toggleOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setVisibleOptions(!visibleOptions);

		if (!visibleOptions === true) document.addEventListener('mousedown', onClickDocument);
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
		styles.width = elRect.width;
		styles.left = elRect.left;
		styles.top = elRect.top + elRect.height + 1;

		return styles;
	}, [visibleOptions, classes?.root]);

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

	return (
		<div tabIndex={-1} ref={selectRef} className={clsx(styles.root, classes?.root, visibleOptions && [styles.opened, classes?.opened], theme === 'dark' && [styles.dark, classes?.dark])}>
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
				{(!value || value.length === 0)
					? placeholder
						? <span className={clsx(styles.placeholder, classes?.placeholder)}>{placeholder}</span>
						: null
					: (
						<ul className={clsx(styles.list, classes?.list)}>
							{value.map((option, index) => index < 2 && (
								<li className={clsx(styles.listItem, classes?.listItem)} key={index}>
									<span className='flex justify-center items-center'>{index === 1 && value.length > 1 ? `${value.length - 1}+` : getOptionLabel(option)}</span>
								</li>
							))}
						</ul>
					)
				}
				<div className={clsx(styles.icons, classes?.icons)}>
					{(value && clearable) &&
						<button role="button" tabIndex={-1} type='button' className={clsx(styles.icon, classes?.icon)} onClick={onClear}>
							<CloseIcon width="1.12rem" height="1.12rem" />
						</button>
					}
					<span className={clsx(styles.icon, classes?.icon, visibleOptions && [styles.expand, classes?.expand])}>
						<ArrowDown width="1.12rem" height="1.12rem" />
					</span>
				</div>
			</div>

			{createPortal((
				<div
					ref={optionsRef}
					style={{
						width: defaultDialogWidth ?? getOptionsStyles.width + 'px',
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
							cloneElement(children(option, value ?? null), { key: index, onClose: hideOptions })
						))
					}
				</div>
			), portalElement ?? document.body)}
		</div>
	);
};

export default MultiSelect;