import React, { useEffect, useRef, useState } from 'react';
import styles from './ColoredTile.module.scss';

interface ColoredTileProps {
	tile: number | null;
	rowIndex: number;
	colIndex: number;
	prevRowIndex?: number;
	prevColIndex?: number;
	merged?: boolean;
	isNew?: boolean;
	tileId?: string;
	isAnimating?: boolean;
	theme: string;
}

// Define the valid tile values as a type
type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

// Define color mapping type
type ColorMap = Record<TileValue, string>;

const ColoredTile: React.FC<ColoredTileProps> = ({
	tile,
	rowIndex,
	colIndex,
	prevRowIndex,
	prevColIndex,
	merged = false,
	isNew = false,
	tileId,
	isAnimating = false,
	theme,
}) => {
	const tileRef = useRef<HTMLDivElement>(null);
	const [currentPosition, setCurrentPosition] = useState({
		top: rowIndex * 120,
		left: colIndex * 120,
	});

	const getTileColor = (value: number): string => {
		const themeColors: Record<string, ColorMap> = {
			neon: {
				2: '#1a1a2e',
				4: '#16213e',
				8: '#0f3460',
				16: '#533483',
				32: '#e94560',
				64: '#ff006e',
				128: '#00d4ff',
				256: '#0099cc',
				512: '#ff6b6b',
				1024: '#ff006e',
				2048: '#00d4ff',
			},
			sunset: {
				2: '#ff9ff3',
				4: '#feca57',
				8: '#ff6b6b',
				16: '#ee5a24',
				32: '#ff9f43',
				64: '#feca57',
				128: '#ff9ff3',
				256: '#feca57',
				512: '#ff6b6b',
				1024: '#ee5a24',
				2048: '#ff9f43',
			},
			forest: {
				2: '#8fbc8f',
				4: '#90ee90',
				8: '#6b8e23',
				16: '#4a7c59',
				32: '#2d5016',
				64: '#8fbc8f',
				128: '#90ee90',
				256: '#6b8e23',
				512: '#4a7c59',
				1024: '#2d5016',
				2048: '#8fbc8f',
			},
			gif: {
				2: '#eee4da',
				4: '#ede0c8',
				8: '#f2b179',
				16: '#f59563',
				32: '#f67c5f',
				64: '#f65e3b',
				128: '#edcf72',
				256: '#edcc61',
				512: '#edc850',
				1024: '#edc53f',
				2048: '#edc22e',
			},
		};

		const colors = themeColors[theme] || themeColors.gif;

		// Type assertion since we know the valid values, or use bracket notation with fallback
		return colors[value as TileValue] || '#3c3a32';
	};

	const getTextColor = (value: number): string => {
		return value <= 4 ? '#776e65' : '#f9f6f2';
	};

	useEffect(() => {
		if (
			isAnimating &&
			tileRef.current &&
			prevRowIndex !== undefined &&
			prevColIndex !== undefined
		) {
			const rootStyles = getComputedStyle(
				tileRef.current.parentElement as Element
			);
			const stepStr = rootStyles.getPropertyValue('--step').trim();
			const step = stepStr ? parseFloat(stepStr) : 120;

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
			const rootStyles = tileRef.current
				? getComputedStyle(tileRef.current.parentElement as Element)
				: undefined;
			const stepStr = rootStyles?.getPropertyValue('--step').trim();
			const step = stepStr ? parseFloat(stepStr) : 120;
			const newTop = rowIndex * step;
			const newLeft = colIndex * step;
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
				backgroundColor: getTileColor(tile),
				color: getTextColor(tile),
			}}
		>
			<div className={styles.value}>{tile}</div>
		</div>
	);
};

export default ColoredTile;
