import React, { useState, useEffect } from 'react';
import {
	initializeBoard,
	addNewTile,
	move,
	isGameOver,
	BoardType,
	Direction,
} from '../../utils/gameLogic';
interface BoardProps {
	isClient: boolean;
}
const Board: React.FC<BoardProps> = ({ isClient }) => {
	const [board, setBoard] = useState<BoardType>(initializeBoard());
	const [gameOver, setGameOver] = useState<boolean>(false);

	const handleMove = (direction: Direction) => {
		if (gameOver) return;
		const newBoard = board.map(row => [...row]);
		const moved = move(newBoard, direction);

		if (moved) {
			addNewTile(newBoard);
			setBoard(newBoard);
			if (isGameOver(newBoard)) {
				setGameOver(true);
			}
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (gameOver) return;
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
				handleMove(direction);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [gameOver, board]);

	if (!isClient) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			{board.map((row, rowIndex) => (
				<div key={rowIndex} style={{ display: 'flex' }}>
					{row.map((tile, colIndex) => (
						<div
							key={colIndex}
							style={{
								width: '50px',
								height: '50px',
								backgroundColor: tile ? '#eee' : '#ccc',
								lineHeight: '50px',
								textAlign: 'center',
								fontSize: '24px',
								color: '#000',
								margin: '1px',
							}}
						>
							{tile}
						</div>
					))}
				</div>
			))}
			{gameOver && <div>Game Over!</div>}
		</div>
	);
};

export default Board;
