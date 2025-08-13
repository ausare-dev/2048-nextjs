import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
	initializeBoard,
	addNewTile,
	move,
	isGameOver,
	BoardStateType,
	Direction,
} from '../../utils/gameLogic';
import { useSwipe } from '../../utils/useSwipe';
import Tile from '../Tile/Tile';
import EmptyTile from '../EmptyTile/EmptyTile';
import ScoreCounter from '../ScoreCounter/ScoreCounter';
import BestScore from '../BestScore/BestScore';
import NewGameButton from '../NewGameButton/NewGameButton';
import styles from './Board.module.scss';

interface BoardProps {
	isClient: boolean;
	onScoreUpdate: (score: number) => void;
}

interface TilePosition {
	id: string;
	value: number;
	row: number;
	col: number;
	prevRow?: number;
	prevCol?: number;
	merged: boolean;
	isNew: boolean;
}

const Board: React.FC<BoardProps> = ({ isClient, onScoreUpdate }) => {
	const [board, setBoard] = useState<BoardStateType>(initializeBoard());
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);
	const [tilePositions, setTilePositions] = useState<TilePosition[]>([]);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const prevBoardRef = useRef<BoardStateType>(board);

	// Функция для создания массива позиций плиток
	const createTilePositions = useCallback(
		(
			currentBoard: BoardStateType,
			previousBoard?: BoardStateType
		): TilePosition[] => {
			const positions: TilePosition[] = [];

			currentBoard.forEach((row, rowIndex) => {
				row.forEach((tile, colIndex) => {
					if (tile.value !== null) {
						let prevRow = rowIndex;
						let prevCol = colIndex;

						// Если есть предыдущая доска, ищем откуда переместилась плитка
						if (previousBoard && tile.id) {
							for (let r = 0; r < 4; r++) {
								for (let c = 0; c < 4; c++) {
									if (previousBoard[r][c].id === tile.id) {
										prevRow = r;
										prevCol = c;
										break;
									}
								}
							}
						}

						positions.push({
							id: tile.id || `${rowIndex}-${colIndex}`,
							value: tile.value,
							row: rowIndex,
							col: colIndex,
							prevRow: tile.isNew ? rowIndex : prevRow,
							prevCol: tile.isNew ? colIndex : prevCol,
							merged: tile.merged,
							isNew: tile.isNew,
						});
					}
				});
			});

			return positions;
		},
		[]
	);

	const handleNewGame = useCallback(() => {
		const newBoard = initializeBoard();
		setBoard(newBoard);
		setGameOver(false);
		setScore(0);
		setTilePositions(createTilePositions(newBoard));
		prevBoardRef.current = newBoard;
	}, [createTilePositions]);

	const handleMove = useCallback(
		(direction: Direction) => {
			if (gameOver || isAnimating) return;

			const newBoard = board.map(row => row.map(tile => ({ ...tile })));
			const { moved, score: moveScore } = move(newBoard, direction);

			if (moved) {
				setIsAnimating(true);

				// Создаем позиции для анимации
				const newPositions = createTilePositions(
					newBoard,
					prevBoardRef.current
				);
				setTilePositions(newPositions);

				// Обновляем доску после короткой задержки для начала анимации
				setTimeout(() => {
					addNewTile(newBoard);
					setBoard(newBoard);
					setTilePositions(createTilePositions(newBoard));
					prevBoardRef.current = newBoard;

					setScore(prevScore => {
						const newScore = prevScore + moveScore;
						onScoreUpdate(newScore);
						return newScore;
					});

					if (isGameOver(newBoard)) {
						setGameOver(true);
					}

					// Завершаем анимацию
					setTimeout(() => {
						setIsAnimating(false);
					}, 50);
				}, 300); // Время анимации
			}
		},
		[gameOver, isAnimating, board, createTilePositions]
	);

	// Поддержка свайпов для мобильных устройств
	useSwipe(handleMove);

	useEffect(() => {
		// Инициализируем позиции плиток при первой загрузке
		setTilePositions(createTilePositions(board));
		prevBoardRef.current = board;
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (gameOver || isAnimating) return;
			let direction: Direction | undefined;
			switch (event.key) {
				case 'ArrowUp':
					direction = 'up';
					break;
				case 'ArrowDown':
					direction = 'down';
					break;
				case 'ArrowLeft':
					direction = 'left';
					break;
				case 'ArrowRight':
					direction = 'right';
					break;
				default:
					return;
			}
			if (direction) {
				event.preventDefault();
				handleMove(direction);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [gameOver, isAnimating, handleMove]);

	if (!isClient) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>2048</div>
			</div>
			<div className={styles.gameBoard}>
				{/* Пустые ячейки как фон */}
				{Array.from({ length: 16 }, (_, index) => (
					<EmptyTile key={`empty-${index}`} />
				))}
				{/* Плитки с анимациями */}
				{tilePositions.map(tilePos => (
					<Tile
						key={tilePos.id}
						tile={tilePos.value}
						rowIndex={tilePos.row}
						colIndex={tilePos.col}
						prevRowIndex={tilePos.prevRow}
						prevColIndex={tilePos.prevCol}
						merged={tilePos.merged}
						isNew={tilePos.isNew}
						tileId={tilePos.id}
						isAnimating={isAnimating}
					/>
				))}
			</div>
			{gameOver && (
				<div className={styles.gameOver}>
					<div className={styles.gameOverText}>Game Over!</div>
					<NewGameButton onNewGame={handleNewGame} />
				</div>
			)}
		</div>
	);
};

export default Board;
