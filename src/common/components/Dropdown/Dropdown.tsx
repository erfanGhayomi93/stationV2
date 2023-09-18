import clsx from 'clsx';
import React, { cloneElement, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dropdown.module.scss';
import { useAppSelector } from 'src/redux/hooks';
import { getTheme } from 'src/redux/slices/ui';

type Option<T> = {
	index: number;
	item: T,
	onClose: () => void;
};

type DropdownProps<T> = {
	portalElement?: HTMLElement;
	data: T[];
	align?: 'right' | 'left';
	children: React.ReactElement;
	classes?: Partial<Record<
		'root' | 'dark' | 'container' | 'list' | 'placeholder' | 'expand',
		ClassesValue
	>>;
	style?: Partial<Record<
		'root' | 'list',
		React.CSSProperties
	>>;
	defaultDialogWidth?: number;
	onOpen?: () => void;
	onClose?: () => void;
	ListItem: (option: Option<T>) => React.ReactElement | null;
};

const Dropdown = <T,>({ classes, style, defaultDialogWidth, portalElement, data, ListItem, children, onOpen, onClose, align = 'right' }: DropdownProps<T>) => {
	const selectRef = useRef<HTMLElement>(null);

	const optionsRef = useRef<HTMLUListElement>(null);

	const theme = useAppSelector(getTheme)


	const [listIsOpen, setListIsOpen] = useState(false);

	const onClickDocument = (e: MouseEvent, removeListener: () => void) => {
		const listEl = optionsRef.current,
			selectEl = selectRef.current;

		if (!listEl || !selectEl) return removeListener();

		const target: Node = (e.target || e.currentTarget) as Node;

		if (target && !listEl.contains(target) && !selectEl.contains(target)) {
			setListIsOpen(false);
			removeListener();
		}
	};

	const onCloseList = () => {
		onClose?.();
	};

	const onOpenList = () => {
		onOpen?.();
	};

	const toggleList = () => {
		setListIsOpen(!listIsOpen);

		if (listIsOpen) onCloseList();
		else onOpenList();

		if (!listIsOpen === true) {
			const controller = new AbortController();

			document.addEventListener('mousedown', (e) => onClickDocument(e, () => controller.abort()), { signal: controller.signal });
			window.addEventListener('blur', () => {
				setListIsOpen(false);
				controller.abort();
			}, { signal: controller.signal });
		}
	};

	const getListStyles = useMemo(() => {
		const styles = {
			width: 0,
			left: 0,
			top: 0
		};

		const selectEl = selectRef.current;
		if (!selectEl) return styles;

		const elRect = selectEl.getBoundingClientRect();
		styles.width = defaultDialogWidth ?? elRect.width;
		styles.left = elRect.left;
		if (align === 'right') styles.left = elRect.left - Math.abs(styles.width - elRect.width);
		styles.top = elRect.top + elRect.height - 1;

		return styles;
	}, [listIsOpen, align]);

	return (
		<>
			{cloneElement(children, { ref: selectRef, onClick: toggleList })}

			{listIsOpen && createPortal((
				<ul
					role="menu"
					ref={optionsRef}
					style={{
						left: getListStyles.left + 'px',
						top: getListStyles.top + 'px',
						opacity: Number(listIsOpen),
						maxHeight: listIsOpen ? undefined : 0,
						pointerEvents: listIsOpen ? undefined : 'none',
						overflowY: listIsOpen ? 'auto' : 'hidden',
						...style?.list,
						width: getListStyles.width + 'px',
					}}
					className={clsx(styles.list, classes?.list, theme === 'dark' && [styles.dark, classes?.dark])}
				>
					{data.map((option, index) => (
						<ListItem
							key={index}
							item={option}
							index={index}
							onClose={() => setListIsOpen(false)}
						/>
					))}
				</ul>
			), portalElement ?? document.body)}
		</>
	);
};

export default Dropdown;