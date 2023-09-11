import React, { cloneElement,  useRef } from 'react';
import styles from './Draggable.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

type DraggableProps = {
	children: React.ReactElement;
	classes?: Partial<Record<
		'root',
		ClassesValue
	>>;
}

const Draggable = ({ classes, children }: DraggableProps) => {
	const containerRef = useRef<HTMLElement | undefined>(undefined);

	const onModalLoad = (el: HTMLDivElement) => {
		if (!el) return;

		try {
			containerRef.current = el ?? null;

			const { innerWidth, innerHeight } = window;
			const { width, height } = el.getBoundingClientRect();

			const positionX = (innerWidth / 2) - (width / 2);
			const positionY = (innerHeight / 2) - (height / 2);

			el.style.left = `${positionX}px`;
			el.style.top = `${positionY}px`;
			el.style.opacity = '1';

			/* Move with header */
			const moveableElement = el.querySelector('.moveable') as HTMLElement;
			moveableElement.addEventListener('mousedown', onDragModal);
		} catch (e) {
			console.log(e);
		}
	};

	const onDropModal = () => {
		try {
			document.body.style.cursor = 'auto';
		} catch (e) {
			//
		}

		window.removeEventListener('mouseup', onDropModal);
		window.removeEventListener('mousemove', onMoveModal);
	};

	const onMoveModal = (e: MouseEvent) => {
		const modal = containerRef.current;
		if (!modal) return;

		try {
			const modalHeaderHeight = 40;

			const { clientX, clientY } = e;
			const { width, height } = modal.getBoundingClientRect();

			let positionX = clientX - (width / 2);
			let positionY = clientY - (modalHeaderHeight / 2);

			if (positionX < 0) positionX = 0;
			else if (positionX > window.innerWidth - width) positionX = window.innerWidth - width;

			if (positionY < 0) positionY = 0;
			else if (positionY > window.innerHeight - height) positionY = window.innerHeight - height;

			modal.style.left = positionX + 'px';
			modal.style.top = positionY + 'px';
		} catch (e) {
			//
		}
	};

	const onDragModal = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		try {
			const modal = containerRef.current;
			if (!modal) return;

			const code = e.button ?? e.which ?? 0;
			if (code !== 0) return;

			document.body.style.cursor = 'move';

			window.addEventListener('mouseup', onDropModal);
			window.addEventListener('mousemove', onMoveModal);
		} catch (e) {
			document.body.style.cursor = 'auto';
		}
	};

	return createPortal((
		<div
			ref={onModalLoad}
			className={clsx(styles.root, classes?.root)}
		>
			{cloneElement(children, { ref: containerRef })}
		</div>
	), document.getElementById('__MODAL') ?? document.body);
};

export default Draggable;