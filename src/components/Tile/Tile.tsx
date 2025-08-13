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

	useEffect(() => {
		if (
			isAnimating &&
			tileRef.current &&
			prevRowIndex !== undefined &&
			prevColIndex !== undefined
		) {
			// Устанавливаем начальную позицию (откуда движется плитка)
			const startTop = prevRowIndex * 120;
			const startLeft = prevColIndex * 120;

			// Конечная позиция (куда движется плитка)
			const endTop = rowIndex * 120;
			const endLeft = colIndex * 120;

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
			// Устанавливаем позицию без анимации
			const newTop = rowIndex * 120;
			const newLeft = colIndex * 120;
			setCurrentPosition({ top: newTop, left: newLeft });
		}
	}, [isAnimating, rowIndex, colIndex, prevRowIndex, prevColIndex]);

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
