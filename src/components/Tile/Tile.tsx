import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Tile.module.scss';

interface TileProps {
	tile: number | null;
	rowIndex: number;
	colIndex: number;
	prevRowIndex?: number;
	prevColIndex?: number;
	merged?: boolean;
	isNew?: boolean;
	tileId?: string;
	isAnimating?: boolean;
}

const Tile: React.FC<TileProps> = ({
	tile,
	rowIndex,
	colIndex,
	prevRowIndex,
	prevColIndex,
	merged = false,
	isNew = false,
	tileId,
	isAnimating = false,
}) => {
	const tileRef = useRef<HTMLDivElement>(null);
	const [currentPosition, setCurrentPosition] = useState({
		top: rowIndex * 120,
		left: colIndex * 120,
	});

	const getGifForTile = (value: number | null): string => {
		if (value === null) {
			return '';
		}
		return `/images/${value}.gif`;
	};

	const updatePosition = () => {
		if (!tileRef.current) return;

		const rootStyles = getComputedStyle(
			tileRef.current.parentElement as Element
		);
		const stepStr = rootStyles.getPropertyValue('--step').trim();
		const step = stepStr ? parseFloat(stepStr) : 120;

		const newTop = rowIndex * step;
		const newLeft = colIndex * step;

		return { top: newTop, left: newLeft, step };
	};

	useEffect(() => {
		if (
			isAnimating &&
			tileRef.current &&
			prevRowIndex !== undefined &&
			prevColIndex !== undefined
		) {
			const position = updatePosition();
			if (!position) return;

			const { step } = position;
			const startTop = prevRowIndex * step;
			const startLeft = prevColIndex * step;
			const endTop = rowIndex * step;
			const endLeft = colIndex * step;

			// Устанавливаем начальную позицию без анимации
			tileRef.current.style.transition = 'none';
			tileRef.current.style.top = `${startTop}px`;
			tileRef.current.style.left = `${startLeft}px`;

			// Принудительно применяем стили
			tileRef.current.offsetHeight;

			// Включаем анимацию и перемещаем в конечную позицию
			tileRef.current.style.transition =
				'top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
			tileRef.current.style.top = `${endTop}px`;
			tileRef.current.style.left = `${endLeft}px`;

			setCurrentPosition({ top: endTop, left: endLeft });
		} else {
			const position = updatePosition();
			if (position) {
				setCurrentPosition({ top: position.top, left: position.left });
			}
		}
	}, [isAnimating, rowIndex, colIndex, prevRowIndex, prevColIndex]);

	// Отслеживание изменения размера родительского элемента
	useEffect(() => {
		if (!tileRef.current || !tileRef.current.parentElement) return;

		const resizeObserver = new ResizeObserver(() => {
			const position = updatePosition();
			if (position) {
				setCurrentPosition({ top: position.top, left: position.left });
			}
		});

		resizeObserver.observe(tileRef.current.parentElement);

		return () => {
			resizeObserver.disconnect();
		};
	}, [rowIndex, colIndex]);

	if (!tile) return null;

	return (
		<div
			ref={tileRef}
			className={`${styles.tile} ${isNew ? styles.newTile : ''} ${
				merged ? styles.mergedTile : ''
			}`}
			style={{
				top: `${currentPosition.top}px`,
				left: `${currentPosition.left}px`,
			}}
		>
			<Image
				className={styles.img}
				src={getGifForTile(tile)}
				alt={`Tile ${tile}`}
				width={100}
				height={100}
				unoptimized
			/>
		</div>
	);
};

export default Tile;
